import jwt from 'jsonwebtoken';

const MAX_EXPIRY = 15777000; // 6 months
const ALGO = "ES256";

interface JwtObject {
  header: {
    alg: string;
    kid: string;
  };
  payload: {
    iss: string;
    iat: number;
    exp: number;
  }
}

function generateAppleMusicJwtObject(keyId: string, teamId: string): JwtObject {
  const timeOfIssue = Math.floor(Date.now() / 1000);
  return {
    header: {
      alg: ALGO,
      kid: keyId, 
    },
    payload: {
      iss: teamId,
      iat: timeOfIssue,
      exp: timeOfIssue + MAX_EXPIRY,
    }
  };
}

function base64Decode(base64string: string): string {
  return Buffer.from(base64string, 'base64').toString('utf8');
}

function decodePrivateKey(privateKey: string): string {
  return base64Decode(privateKey);
}

export default (keyId: string, teamId: string, privateKey: string): string => {
  const { header, payload } = generateAppleMusicJwtObject(keyId, teamId);
  return jwt.sign(payload, decodePrivateKey(privateKey), {
    header,
    algorithm: ALGO,
  })
};
