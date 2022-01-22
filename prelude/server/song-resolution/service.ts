import { SongResolutionRepository } from "./types";
import { parseSpotifyLinkData } from "./utils";

export default (repository: SongResolutionRepository) => {
  return {
    getTrackFromSpotify: async (spotifyUrl: string) => {
      const { songIndex } = parseSpotifyLinkData(spotifyUrl);
      const res = await repository.fetchTrackFromSpotify(songIndex, "");
      return res;
    },
    getTrackFromAppleMusic: async (songId: string, market: string) => {
      const res = await repository.fetchTrackFromAppleMusic(songId, market);
      return res;
    }
  };
};
