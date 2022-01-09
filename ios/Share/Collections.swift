//
//  Collections.swift
//  Share
//
//  Created by Jordon on 2022-01-05.
//

import Foundation

struct CollectionField: Codable {
  let name: StringField
  var songUrls: ArrayField
  
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
      self.songUrls = ArrayField(arrayValue: ArrayValue(from: []))
    }
  }
  
  struct StringField: Codable {
    let stringValue: String
  }

  struct ArrayValue: Codable {
    var values: [StringField]
    
    enum CodingKeys: String, CodingKey {
      case values
    }
    
    init(from decoder: Decoder) throws {
      do {
        let object = try decoder.container(keyedBy: CodingKeys.self)
        self.values = try object.decode([StringField].self, forKey: .values)
      } catch {
        self.values = []
      }
    }
    
    init(from values: [StringField]) {
      self.values = values
    }
  }

  struct ArrayField:  Codable {
    var arrayValue: ArrayValue
  }
}

struct Collection: Codable {
  var fields: CollectionField
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

struct CollectionPatch: Codable {
  var fields: CollectionPatchFields

  struct CollectionPatchFields: Codable {
    let name: CollectionField.StringField
    let songUrls: CollectionField.ArrayField
  }
}
//"name": ["stringValue": collectionToUpdate.fields.name.stringValue],
//"songUrls": ["arrayValue":
//  collectionToUpdate.fields.songUrls.arrayValue.values
//],
