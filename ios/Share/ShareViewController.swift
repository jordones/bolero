//
//  ShareViewController.swift
//  Share
//
//  Created by Jordon on 2021-12-03.
//

import UIKit
import Social
import LinkPresentation

class ShareViewController: SLComposeServiceViewController {

    private var isValidMusicUrl: Bool = false
    private static let validHosts = ["open.spotify.com", "music.apple.com"]
    private var authToken: String? = nil
    private var userId: String? = nil
    private var songLink: String? = nil

    override func viewDidLoad() {
        super.viewDidLoad()
        let defaults = UserDefaults(suiteName: "group.bolero.ext")
        authToken = defaults?.string(forKey: "access_token") ?? nil
        userId = defaults?.string(forKey: "user_id") ?? nil

        if authToken == nil || authToken == "" {
          self.textView.text = "Please sign in through the Bolero app :)"
          self.textView.isEditable = false
        } else {
          self.title = "Share song!"
          self.handleSharedLink()
        }
    }
  
    override func isContentValid() -> Bool {
        // Do validation of contentText and/or NSExtensionContext attachments here
        print("isContentValid -> " + String(isValidMusicUrl))
        return isValidMusicUrl
    }

    override func didSelectPost() {
        // This is called after the user selects Post. Do the upload of contentText and/or NSExtensionContext attachments.
        if let song = self.songLink {
          self.postSongLink(song, self.textView.text)
        }
        // Inform the host that we're done, so it un-blocks its UI. Note: Alternatively you could call super's -didSelectPost, which will similarly complete the extension context.
        self.extensionContext!.completeRequest(returningItems: [], completionHandler: nil)
    }

    override func configurationItems() -> [Any]! {
        // To add configuration options via table cells at the bottom of the sheet, return an array of SLComposeSheetConfigurationItem here.
        return []
    }
  
    private func handleSharedLink() {
      print("handleSharedLink() -> start")
      let sharedData = self.extensionContext?.inputItems.first as? NSExtensionItem
      let provider = sharedData?.attachments?.first
      if provider?.hasItemConformingToTypeIdentifier("public.url") != nil {
        Task {
          let result = try await provider?.loadItem(forTypeIdentifier: "public.url", options: nil)
          guard result != nil else { return }
          if let url = result as? URL, let host = url.host {
            if ShareViewController.validHosts.contains(host) {
              self.isValidMusicUrl = true
              self.songLink = url.absoluteString
              self.fetchPreview(for: url.absoluteString)
              self.validateContent()
            } else {
              self.textView.text = "Why not try a Spotify or Music link?"
              self.textView.isEditable = false
            }
          }
        }
      }
    }
  
  private func fetchPreview(for link: String) {
    print("~~~~~~~\nmade it to fetchPreview with " + link)
    let linkPreview = LPLinkView()
    let provider = LPMetadataProvider()
    guard let url = URL(string: link) else {
      return
    }

    let view = self.view
    provider.startFetchingMetadata(for: url) { metaData, error in
      guard let data = metaData, error == nil else {
        print("~~~ error in data ~~~~")
        return
      }
      print("~~~ adding view ~~~~")
      DispatchQueue.main.async {
        linkPreview.metadata = data
        view?.addSubview(linkPreview)
        let viewWidth = view?.frame.width ?? 300
        linkPreview.frame = CGRect(x: 0, y: 0, width: viewWidth, height: 100)
      }
    }
  }
  
  private func postSongLink(_ link: String, _ comment: String) {
    guard let userId = self.userId, let authToken = self.authToken else {
      return
    }
    let url = URL(string: "https://firestore.googleapis.com/v1/projects/bolero-app/databases/(default)/documents/posts/\(userId)/userPosts")!
    let now = Date().ISO8601Format()

    let payload: [String: [String: String]?] = [
      "songUrl": ["stringValue": link],
      "comment": ["stringValue": comment],
      "createdAt": ["timestampValue": now],
      "updatedAt": ["timestampValue": now],
    ]
    let fullPayload: Dictionary = [
      "fields": payload,
    ] as [String : Any]

    let serializedPayload = try? JSONSerialization.data(withJSONObject: fullPayload)
    var request = URLRequest(url: url)
    request.setValue("Bearer \(authToken)", forHTTPHeaderField: "Authorization")
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
    request.httpMethod = "POST"
    request.httpBody = serializedPayload
    
    let task = URLSession.shared.dataTask(with: request) { data, error, etc in
      print(data as Any)
      print(error as Any)
      print(etc as Any)
    }
    task.resume()
  }
}
