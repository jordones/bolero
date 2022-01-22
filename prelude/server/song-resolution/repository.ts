import { Spotify } from '../integrations/spotify';

export default (spotify: Spotify) => {
  return {
    fetchTrackFromSpotify: async (songId: string, market: string) => {
      const data = await spotify.getSong(songId);
      return data;
    },
    fetchTrackFromAppleMusic: async (songId: string, market: string) => {

    },
  };
};
