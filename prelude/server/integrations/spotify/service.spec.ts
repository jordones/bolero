import repository from './repository';
import Service from './service';
import { Repository, TrackResponse } from './types';

const noOp: any = () => {};

describe('Spotify Integration', () => {
  describe('Service', () => {
    const repo: Repository = {
      accessTokenExpiry: undefined,
      loadAccessToken: jest.fn(),
      fetchSongById: jest.fn(),
    }

    beforeEach(() => {
      jest.resetAllMocks();
      repo.accessTokenExpiry = undefined;
    })

    it('Middleware fetches access token when expiry not set', () => {
      const service = Service(repo);
      service.middleware(noOp, noOp, noOp);
      expect(repo.loadAccessToken).toHaveBeenCalledTimes(1);
    });

    it('Middleware refreshes access token when expiry has lapsed', () => {
      repo.accessTokenExpiry = new Date('September 30, 1995 00:00:00');
      const service = Service(repo);
      service.middleware(noOp, noOp, noOp);
      expect(repo.loadAccessToken).toHaveBeenCalledTimes(1);
    });

    it('Middleware refreshes access token when expiry has lapsed', () => {
      const inOneMinute = new Date();
      inOneMinute.setMinutes(inOneMinute.getMinutes() + 1)
      repo.accessTokenExpiry = inOneMinute;
      const service = Service(repo);
      service.middleware(noOp, noOp, noOp);
      expect(repo.loadAccessToken).not.toBeCalled();
    });

    it('GetSong returns song object', async () => {
      const mockTrack: TrackResponse = {
        name: 'Welcome To The Family',
        album: { name: 'COMPLAINT'},
        artists: [{name: 'Watsky'}],
        external_urls: {
          spotify: 'song-url-test'
        },
        explicit: false
      };

      (repo.fetchSongById as jest.Mock).mockResolvedValue({
        data: mockTrack,
      });
      const service = Service(repo);
      const result = await service.getSong("123");
      expect(result).toMatchObject({
        title: mockTrack.name,
        album: mockTrack.album.name,
        artist: mockTrack.artists[0].name,
        unique_id: 'TODO-GENERATE_HASH',
        explicit: false,
        external_urls: {
          'spotify': 'song-url-test',
        },
      });
    });
  });
});

// const artistNameMap = data.artists.map(artist => artist.name);
// return {
//   title: data.name,
//   album: data.album.name,
//   artist: artistNameMap.join(', '),
//   unique_id: data.external_ids?.isrc ?? "TODO-GENERATE_HASH",
//   explicit: data.explicit,
//   external_urls: data.external_urls,
// }