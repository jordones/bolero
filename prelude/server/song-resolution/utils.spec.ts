import { Platform } from './types';
import { getServiceForUrl } from './utils';

describe('Song Resolution', () => {
  describe('Utils', () => {
    it('getServiceForUrl maps url to correct service', () => {
      expect(getServiceForUrl('https://open.spotify.com/')).toBe(Platform.spotify);
      expect(getServiceForUrl('https://music.apple.com/')).toBe(Platform.appleMusic);
      expect(getServiceForUrl('https://youtube.com/')).toBe(Platform.unsupported);
      expect(getServiceForUrl('anything-not-a-url')).toBe(Platform.unsupported);
    })

    it('parseSpotifyLinkData returns data for searching the song', () => {
      const spotify = 'https://open.spotify.com/track/3L3xny8Z4urtJbG5noCKmd?si=COHHSKKdTPm6v3qr2Ki5lQ'; // query param is a user data
      const spotifyWithQuery = 'https://open.spotify.com/track/3L3xny8Z4urtJbG5noCKmd';
      test.todo('implement spotify parser');
    });

    it('parseAppleMusicLinkData returns data for searching the song', () => {
      const apple = 'https://music.apple.com/ca/album/afterimage/1517666539?i=1517666542'; // query param is the song
      test.todo('implement apple music parser');
    });
  });
})
