//
//  ShareExtViewController.swift
//  Share
//
//  Created by jordon smith on 2022-01-07.
//

import Foundation
import UIKit
import Social
import LinkPresentation
import Alamofire

class ShareExtViewController: UIViewController {
  
  private static let validHosts = ["open.spotify.com", "music.apple.com"]
    // User data
    private var authToken: String? = nil
    private var userId: String? = nil
    private var refreshToken: String? = nil
    private var collections: [Collection] = []

  
    // Collection button
    @IBOutlet weak var collectionButton: UIButton!
    @IBOutlet weak var collectionActivityIndicator: UIActivityIndicatorView!

    // Rich Preview UI
    @IBOutlet weak var richPreviewView: UIView!
    @IBOutlet weak var previewActivityIndicator: UIActivityIndicatorView!
    
    override func viewDidLoad() {
      super.viewDidLoad()
      loadUserAuth()
      
      if refreshToken != nil {
        self.refreshAuth(refreshToken!)
      }
      
      if authToken == nil || authToken == "" {

      } else {
        handleSharedLink()
        loadCollections()
      }
  }
  
  private func loadUserAuth() {
    let defaults = UserDefaults(suiteName: "group.bolero")
    authToken = defaults?.string(forKey: "access_token") ?? nil
    userId = defaults?.string(forKey: "user_id") ?? nil
    refreshToken = defaults?.string(forKey: "refresh_token") ?? nil
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
          if ShareExtViewController.validHosts.contains(host) {
            //self.isValidMusicUrl = true
            //self.songLink = url.absoluteString
            self.fetchPreview(for: url.absoluteString)
            //self.validateContent()
          } else {
            //self.textView.text = "Why not try a Spotify or Music link?"
            //self.textView.isEditable = false
          }
        }
      }
    }
  }
  
  private func fetchPreview(for link: String) {
    print("~~~~~~~\nmade it to fetchPreview with " + link)
    let provider = LPMetadataProvider()
    guard let url = URL(string: link) else {
      return
    }

    let view = self.richPreviewView
    let loader = self.previewActivityIndicator
    provider.startFetchingMetadata(for: url) { metaData, error in
      guard let data = metaData, error == nil else {
        print("~~~ error in data ~~~~")
        return
      }
      print("~~~ adding view ~~~~")
      DispatchQueue.main.async {
        loader?.stopAnimating()
        let linkPreview = LPLinkView(metadata: data)

        view?.addSubview(linkPreview)
        
        let viewWidth = view?.frame.width ?? 300
        let viewHeight = view?.frame.height ?? 170
        
        
        linkPreview.frame = CGRect(x: 0, y: 0, width: viewWidth, height: viewHeight)
      }
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
      debugPrint(response)
      do {
        let jsonDecoder = JSONDecoder()
        let parsedData = try jsonDecoder.decode(DocumentResponse.self, from: data)
        self.collections = parsedData.documents
        self.initMenu(with: parsedData.documents)
      } catch {
        print("ow? \(error)")
        self.initMenu(with: [])
      }
    }
  }
  
  private func initMenu(with collections: [Collection]) {
    let optionsClosure = { (action: UIAction) in
      print(action.title)
    }

    var buttons: [UIAction] = []
    
    if collections.isEmpty {
      buttons = [
        UIAction(title: "Couldn't find collections", handler: optionsClosure)
      ]
      self.collectionButton.isEnabled = false
    } else {
      buttons = collections.map { collection in
        return UIAction(title: collection.fields.name.stringValue, handler: optionsClosure)
      }
    }
    buttons[0].state = .on
    self.collectionButton.menu = UIMenu(children: buttons)
    self.collectionActivityIndicator.stopAnimating()

  }
}
