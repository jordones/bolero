import { SongResolutionRepository } from "./types";

export default (repository: SongResolutionRepository) => {
  return {
    getTrackFromSpotify: async (songId: string, market: string) => {
      const res = await repository.fetchTrackFromSpotify(songId, market);
      return res;
    },
    getTrackFromAppleMusic: async (songId: string, market: string) => {
      const res = await repository.fetchTrackFromAppleMusic(songId, market);
      return res;
    }
  };
};
