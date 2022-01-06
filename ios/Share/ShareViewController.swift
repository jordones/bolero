//
//  ShareViewController.swift
//  Share
//
//  Created by Jordon on 2021-12-03.
//

import UIKit
import Social
import LinkPresentation
import Alamofire

class ShareViewController: SLComposeServiceViewController {

  private var isValidMusicUrl: Bool = false
  private static let validHosts = ["open.spotify.com", "music.apple.com"]
  private var authToken: String? = nil
  private var userId: String? = nil
  private var refreshToken: String? = nil
  private var songLink: String? = nil
  private var collections: [Collection] = []

  override func viewDidLoad() {
      super.viewDidLoad()
      let defaults = UserDefaults(suiteName: "group.bolero")
      authToken = defaults?.string(forKey: "access_token") ?? nil
      userId = defaults?.string(forKey: "user_id") ?? nil
      refreshToken = defaults?.string(forKey: "refresh_token") ?? nil

      if refreshToken != nil {
        self.refreshAuth(refreshToken!)
      }
      if authToken == nil || authToken == "" {
        self.textView.text = "Please sign in through the Bolero app :)"
        self.textView.isEditable = false
      } else {
        self.title = "Share song!"
        self.handleSharedLink()
        self.loadCollections()
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
  
  // Load user's collections from FireStore
  private func loadCollections() {
    guard let userId = self.userId, let authToken = self.authToken else { return }
    let url = "https://firestore.googleapis.com/v1/projects/bolero-app/databases/(default)/documents/users/\(userId)/songCollections"
    let headers: HTTPHeaders = HTTPHeaders([
      "Authorization": "Bearer \(authToken)",
      "Content-Type": "application/json",
    ]);

    AF.request(
      url,
      method: .get,
      headers: headers
    )
    .validate()
    .responseData { (response) in
      guard let data = response.data else { return }
      do {
        let jsonDecoder = JSONDecoder()
        let parsedData = try jsonDecoder.decode(DocumentResponse.self, from: data)
        self.collections = parsedData.documents
      } catch {
        print("ow? \(error)")
      }
    }
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
    
    let now = Date().ISO8601Format()
    let url = "https://firestore.googleapis.com/v1/projects/bolero-app/databases/(default)/documents/posts/\(userId)/userPosts"
    let headers: HTTPHeaders = HTTPHeaders([
      "Authorization": "Bearer \(authToken)",
      "Content-Type": "application/json",
    ]);
    
    let parameters = [
      "fields": [
        "songUrl": ["stringValue": link],
        "comment": ["stringValue": comment],
        "createdAt": ["timestampValue": now],
        "updatedAt": ["timestampValue": now],
      ]
    ]

    AF.request(
      url,
      method: .post,
      parameters: parameters,
      encoder: JSONParameterEncoder.default,
      headers: headers
    ).response { (response) in
      debugPrint(response)
    }
  }

  private func refreshAuth(_ refreshToken: String) {
    guard let _ = self.userId, let _ = self.authToken else {
      return
    }

    let url = "https://securetoken.googleapis.com/v1/token?key=AIzaSyD_7uTAILVsIe8wNDWWPCE2tlMIc4EDQqY"
    let parameters = [
      "grant_type": "refresh_token",
      "refresh_token": refreshToken
    ]

    AF.request(
      url,
      method: .post,
      parameters: parameters,
      encoder: JSONParameterEncoder.default
    )
    .validate()
    .responseData { (response) in
      guard let data = response.data else { return }
      debugPrint(response)
      do {
        let jsonDecoder = JSONDecoder()
        let parsedData = try jsonDecoder.decode(AuthResponse.self, from: data)
        self.authToken = parsedData.idToken
        self.userId = parsedData.userId
        self.refreshToken = parsedData.refreshToken
      } catch {
        print("ow? \(error)")
      }
    }
  }
}
