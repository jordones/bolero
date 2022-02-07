import { AxiosResponse } from 'axios';
import Service from './service';

export interface TokenArgs {
  keyId: string;
  teamId: string;
  privateKey: string;
}

export type Service = ReturnType<typeof Service>;
export interface Repository {
  fetchSongById: (songId: string, market: string) => Promise<AxiosResponse<TrackResponse>>;
  searchByIsrc: (isrc: string) => any;
}

export const endpoints = {
  tracks: (id: string, storefront: string) => `v1/catalog/${storefront}/songs/${id}`,
  search: (isrc: string) => `v1/catalog/CA/songs?filter[isrc]=${isrc}`, // TODO: find a source for storefront and un-hardcode
};

interface Artist {
  name: string;
}

type Artists = [Artist];

interface Album {
  name: string;
}

// Spotify: https://developer.spotify.com/documentation/web-api/reference/#/operations/get-track
// Apple: https://developer.apple.com/documentation/applemusicapi/songs/attributes?changes=latest_major
interface TrackAttributes {
  name: string;
  artistName: string;
  albumName: string;
  url: string;
  isrc: string;
  contentRating: string;
}

export interface TrackResponse {
  data: [
    {
      attributes: TrackAttributes;
    }
  ]
}
