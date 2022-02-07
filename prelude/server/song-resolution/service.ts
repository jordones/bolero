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
      const { songIndex, storefront } = parseAppleMusicLinkData(appleMusicUrl);
      const res = await repository.fetchTrackFromAppleMusic(songIndex!, storefront);
      return res;
    }
  };
};
