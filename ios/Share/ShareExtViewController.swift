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
  
  // State
  private var selectedCollection: String? = nil
  private var collections: [Collection] = []

  // Toolbar actions
  @IBAction func cancelButtonAction(_ sender: UIBarButtonItem) {
    closeExtension()
  }

  @IBOutlet weak var saveButton: UIBarButtonItem!
  @IBAction func saveButtonAction(_ sender: UIBarButtonItem) {
    postSongLink(onSuccess: closeExtension, onFailure: setFailedToUpload)
  }

  // Collection button
  @IBOutlet weak var collectionButton: UIButton!
  @IBOutlet weak var collectionActivityIndicator: UIActivityIndicatorView!

  // Rich Preview UI
  @IBOutlet weak var richPreviewView: UIView!
  @IBOutlet weak var previewActivityIndicator: UIActivityIndicatorView!
  
  // Validation UI
  @IBOutlet weak var errorMessageLabel: UILabel!
    
    
  override func viewDidLoad() {
    super.viewDidLoad()
    errorMessageLabel.isHidden = true
    loadUserAuth()
    
    if let token = refreshToken {
      refreshAuth(token, onSuccess: loadCollections, onFailure: setUserAsNotAuthenticated)
    } else {
      setUserAsNotAuthenticated()
      return
    }
     
    handleSharedLink()
  }
  
  private func loadUserAuth() {
    let defaults = UserDefaults(suiteName: "group.bolero")
    authToken = defaults?.string(forKey: "access_token") ?? nil
    userId = defaults?.string(forKey: "user_id") ?? nil
    refreshToken = defaults?.string(forKey: "refresh_token") ?? nil
  }
  

  private func handleSharedLink() {
    let sharedData = self.extensionContext?.inputItems.first as? NSExtensionItem
    let provider = sharedData?.attachments?.first
    if provider?.hasItemConformingToTypeIdentifier("public.url") != nil {
      Task {
        let result = try await provider?.loadItem(forTypeIdentifier: "public.url", options: nil)
        guard result != nil else { return }
        if let url = result as? URL, let host = url.host {
          if ShareExtViewController.validHosts.contains(host) {
            fetchPreview(for: url.absoluteString)
          } else {
            setShareAsInvalid()
          }
        }
      }
    }
  }
  
  private func closeExtension() {
    self.extensionContext?.completeRequest(returningItems: nil, completionHandler: nil)
  }
  
  private func setError(text value: String) {
    saveButton.isEnabled = false
    errorMessageLabel.text = value
    errorMessageLabel.isEnabled = true
    errorMessageLabel.isHidden = false
  }
    
  private func setShareAsInvalid() {
    setError(text: "The link you shared is not supported at this time")
  }
  
  private func setUserAsNotAuthenticated() {
    setError(text: "Please sign in through the app before continuing")
  }
    
  private func setUserHasNoCollections() {
    setError(text: "You need to add a collection in the app before you can share")
  }
  
  private func setFailedToUpload() {
    setError(text: "Something went wrong posting your song, try again later")
  }
  
  private func fetchPreview(for link: String) {
    let provider = LPMetadataProvider()
    guard let url = URL(string: link) else {
      return
    }

    let view = self.richPreviewView
    let loader = self.previewActivityIndicator
    provider.startFetchingMetadata(for: url) { metaData, error in
      guard let data = metaData, error == nil else {
        return
      }
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

  private func refreshAuth(_ refreshToken: String, onSuccess: @escaping () -> Void, onFailure: @escaping () -> Void) {
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
      do {
        let jsonDecoder = JSONDecoder()
        let parsedData = try jsonDecoder.decode(AuthResponse.self, from: data)
        self.authToken = parsedData.idToken
        self.userId = parsedData.userId
        self.refreshToken = parsedData.refreshToken
        onSuccess()
      } catch {
        print("Failed refreshAuth: \(error)")
        onFailure()
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
        self.initMenu(with: parsedData.documents)
        self.collections = parsedData.documents
        debugPrint(self.collections)
      } catch {
        print("Failed loadCollections: \(error)")
        self.initMenu(with: [])
        self.setUserHasNoCollections()
      }
    }
  }
  
  private func initMenu(with collections: [Collection]) {
    let optionsClosure = { (action: UIAction) in
      print(action.title)
      self.selectedCollection = action.title
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
      self.selectedCollection = buttons[0].title

    }
    buttons[0].state = .on
    self.collectionButton.menu = UIMenu(children: buttons)
    self.collectionActivityIndicator.stopAnimating()
  }
  
  private func postSongLink(onSuccess: @escaping () -> Void, onFailure: @escaping () -> Void) {
    guard let authToken = self.authToken else {
      setFailedToUpload()
      return
    }
    var collectionToUpdate: Collection = collections.first(where: { collection in
      collection.fields.name.stringValue == self.selectedCollection
    }) ?? self.collections[0]
    // collection.name is the path in firestore
    // e.g. projects/bolero-app/databases/(default)/documents/users/(userId)/songCollections/(collectionId)
    let url = "https://firestore.googleapis.com/v1/\(collectionToUpdate.name)"
    let headers: HTTPHeaders = HTTPHeaders([
      "Authorization": "Bearer \(authToken)",
      "Content-Type": "application/json",
    ]);
    
    let songToPost = CollectionField.StringField(stringValue: "test")
    collectionToUpdate.fields.songUrls.arrayValue.values.append(songToPost)
    
    let parameters: CollectionPatch = CollectionPatch(fields: CollectionPatch.CollectionPatchFields(
      name: collectionToUpdate.fields.name,
      songUrls: collectionToUpdate.fields.songUrls
    ))

    AF.request(
      url,
      method: .patch,
      parameters: parameters,
      encoder: JSONParameterEncoder.default,
      headers: headers
    )
    .validate()
    .response { (response) in
      debugPrint(response)
      switch response.result {
      case.success:
        onSuccess()
      case .failure:
        onFailure()
      }
    }
  }
}
