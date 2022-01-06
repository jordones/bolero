//
//  Collections.swift
//  Share
//
//  Created by Jordon on 2022-01-05.
//

import Foundation

struct CollectionField: Decodable {
  let name: StringField
  let songUrls: ArrayField?
  
  enum CodingKeys: String, CodingKey {
    case name
    case songUrls
  }
  
  init(from decoder: Decoder) throws {
    let values = try decoder.container(keyedBy: CodingKeys.self)
    self.name = try values.decode(StringField.self, forKey: .name)
    
    if values.contains(.songUrls) {
      self.songUrls = try values.decode(ArrayField.self, forKey: .songUrls)
    } else {
      self.songUrls = nil
    }
  }
  
  struct StringField: Decodable {
    let stringValue: String
  }

  struct ArrayValue: Decodable {
    let values: [StringField]
  }

  struct ArrayField: Decodable {
    let arrayValue: ArrayValue
  }
}

struct Collection: Decodable {
  let fields: CollectionField
  let createTime: String
  let updateTime: String
  let name: String
}

struct DocumentResponse: Decodable {
  let documents: [Collection]
}

struct AuthResponse: Decodable {
  let expiresIn: String
  let tokenType: String
  let refreshToken: String
  let idToken: String
  let userId: String
  let projectId: String

  enum CodingKeys: String, CodingKey {
    case expiresIn = "expires_in"
    case tokenType = "token_type"
    case refreshToken = "refresh_token"
    case idToken = "id_token"
    case userId = "user_id"
    case projectId = "project_id"
  }
}
