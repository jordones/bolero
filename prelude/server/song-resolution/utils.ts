import { URL } from "url";
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

export function isValidPlatform(platform: Platform) {
  return platform !== Platform.unsupported;
}

// Need to parse song id
// to be used with https://developer.spotify.com/console/get-track/?id=&market=
export function parseSpotifyLinkData(spotifyLink: string) {
  const linkAsUrl = new URL(spotifyLink);
  const songIndex = linkAsUrl.pathname.replace('/track/', '');

  return {
    songIndex
  };
}

// Need to parse storefront and song id
// to be used with https://developer.apple.com/documentation/applemusicapi/get_a_catalog_song
export function parseAppleMusicLinkData(appleMusicLink: string) {
  const linkAsUrl = new URL(appleMusicLink);
  const storefront = linkAsUrl.pathname.split('/')[1];
  const songIndex = linkAsUrl.searchParams.get('i');
  return {
    storefront,
    songIndex
  };
}
