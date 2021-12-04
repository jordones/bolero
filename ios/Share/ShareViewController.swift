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
    private var songPreview: LPLinkView? = nil

    override func viewDidLoad() {
        super.viewDidLoad()
        self.title = "Share song!"
        self.handleSharedLink()
    }
  
    override func isContentValid() -> Bool {
        // Do validation of contentText and/or NSExtensionContext attachments here
        print("isContentValid -> " + String(isValidMusicUrl))
        return isValidMusicUrl
    }

    override func didSelectPost() {
        // This is called after the user selects Post. Do the upload of contentText and/or NSExtensionContext attachments.
    
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
}