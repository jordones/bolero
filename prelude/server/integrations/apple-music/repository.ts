import axios from "axios";
import { endpoints, Repository, TokenArgs } from "./types";
import AppleMusicAuth from "../../lib/apple";

const BASE_URL = 'https://api.music.apple.com';

export default ({teamId, keyId, privateKey}: TokenArgs): Repository => {
  const appleJwt = AppleMusicAuth(keyId, teamId, privateKey);

  const appleMusicApi = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Authorization': `Bearer ${appleJwt}`,
    }
  });

  return {
    async fetchSongById (songId: string, market: string) {
      return appleMusicApi.get(endpoints.tracks(songId, market));
    },
    async searchByIsrc(isrc: string) {
      return appleMusicApi.get(endpoints.search(isrc));
    }
  };
};
