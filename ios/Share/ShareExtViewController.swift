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

class ShareExtViewController: UIViewController {
  
  private static let validHosts = ["open.spotify.com", "music.apple.com"]
  
    @IBOutlet weak var RichPreviewView: UIView!
    @IBOutlet weak var activityIndicator: UIActivityIndicatorView!
    
    override func viewDidLoad() {
      super.viewDidLoad()
      handleSharedLink()
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

    let view = self.RichPreviewView
    let loader = self.activityIndicator
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
}

//in your custom view controller you can refer to self.extensionContext to read and complete the share action. Refer to the code in the template ShareViewExtension
