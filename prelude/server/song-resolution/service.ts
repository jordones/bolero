import { SongResolutionRepository } from "./types";
import { parseAppleMusicLinkData, parseSpotifyLinkData } from "./utils";

export default (repository: SongResolutionRepository) => {
  return {
    getTrackFromSpotify: async (spotifyUrl: string) => {
      const { songIndex } = parseSpotifyLinkData(spotifyUrl);
      const res = await repository.fetchTrackFromSpotify(songIndex, "");
      return res;
    },
    getTrackFromAppleMusic: async (appleMusicUrl: string) => {
      console.log('got to service')
      const { songIndex, storefront } = parseAppleMusicLinkData(appleMusicUrl);
      console.log (songIndex, storefront);
      const res = await repository.fetchTrackFromAppleMusic(songIndex!, storefront);
      return res;
    }
  };
};
