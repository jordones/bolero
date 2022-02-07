import axios from "axios";
import { AuthResponse, endpoints, Repository } from "./types";

const BASE_URL = 'https://api.spotify.com';
const AUTH_URL = 'https://accounts.spotify.com';

export default (encodedSecret: string): Repository => {
  const spotifyApi = axios.create({
    baseURL: BASE_URL,
  });

  const baseTrackSearchQuery = "type=track&limit=1";
  const buildSearchQuery = (query: string) => spotifyApi.get(`${endpoints.search}?${query}&${baseTrackSearchQuery}`)

  return {
    accessTokenExpiry: undefined,
    async loadAccessToken () {
      try {
        const body = new URLSearchParams();
        body.append('grant_type', 'client_credentials');
        const { data } = await axios.post<AuthResponse>(`${AUTH_URL}${endpoints.token}`, body, {
          headers: {
            'Authorization' : `Basic ${encodedSecret}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
  
        const newExpiry = new Date();
        newExpiry.setMinutes(newExpiry.getMinutes() + (data.expires_in / 60));
        this.accessTokenExpiry = newExpiry
        spotifyApi.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;
      } catch (err) {
        console.error(err);
      }
    },
    async fetchSongById (songId: string) {
      return spotifyApi.get(`${endpoints.tracks}${songId}`);
    },
    async searchByIsrc (isrc: string) {
      const query = `q=isrc:${isrc}`
      return buildSearchQuery(query);
      // return spotifyApi.get(`${endpoints.search}?q=${query}&${baseTrackSearchQuery}`)
    },
  };
};
