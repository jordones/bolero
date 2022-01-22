import { AxiosResponse } from 'axios';
import Service from './service';

export type Service = ReturnType<typeof Service>;
export interface Repository {
  accessTokenExpiry: Date | undefined;
  loadAccessToken: () => Promise<void>;
  fetchSongById: (songId: string) => Promise<AxiosResponse<TrackResponse>>;
}

export const endpoints = {
  token: '/api/token/',
  tracks: '/v1/tracks/',
};

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}


interface Artist {
  name: string;
}

type Artists = [Artist];

interface Album {
  name: string;
}

// Spotify: https://developer.spotify.com/documentation/web-api/reference/#/operations/get-track
// Apple: https://developer.apple.com/documentation/applemusicapi/songs/attributes?changes=latest_major
interface TrackResponse {
  name: string;
  album: Album;
  artists: Artists;
  external_urls: {
    spotify: string;
  }
  external_ids?: {
    isrc?: string; // We'll use ISRC (or our own hash) to index songs since Apple music also exposes this
  }
  explicit: boolean;
}
