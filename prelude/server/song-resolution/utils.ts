import { Platform } from "./types";

const hostnameToPlatform: { [k: string]: Platform } = {
  'spotify.com': Platform.spotify,
  'apple.com': Platform.appleMusic,
  '.': Platform.unsupported, // Catch-all, keep as last in order
};

export function getServiceForUrl(songUrl: string): Platform {
  const key = Object.keys(hostnameToPlatform).find(
    hostname => songUrl.match(new RegExp(hostname)), 
  ) || '.';

  return hostnameToPlatform[key];
}

export function parseSpotifyLinkData(spotifyLink: string) {

}

export function parseAppleMusicLinkData(appleMusicLink: string) {
  
}
