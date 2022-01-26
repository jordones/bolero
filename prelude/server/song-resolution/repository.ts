import { AppleMusic } from '../integrations/apple-music';
import { Spotify } from '../integrations/spotify';

export default (spotify: Spotify, appleMusic: AppleMusic) => {
  return {
    fetchTrackFromSpotify: async (songId: string, market: string) => {
      const data = await spotify.getSong(songId);
      return data;
    },
    fetchTrackFromAppleMusic: async (songId: string, market: string) => {
      const data = await appleMusic.getSong(songId, market);
      return data;
    },
  };
};
