import repository from './repository';
import Service from './service';
import { Repository, TrackResponse } from './types';

const noOp: any = () => {};

describe('Apple Music Integration', () => {
  describe('Service', () => {
    const repo: Repository = {
      fetchSongById: jest.fn(),
    }

    beforeEach(() => {
      jest.resetAllMocks();
    })

    it('GetSong returns song object', async () => {
      const mockTrack: TrackResponse = {
        data: [
          {
            attributes: {
              name: 'Welcome To The Family',
              albumName: 'COMPLAINT',
              artistName: 'Watsky',
              url: 'song-url-test',
              isrc: '123',
              contentRating: 'explicit',
            }
          }
        ]
      };

      (repo.fetchSongById as jest.Mock).mockResolvedValue({
        data: mockTrack,
      });
      const service = Service(repo);
      const result = await service.getSong("https://music.apple.com/ca/album/afterimage/1517666539?i=1517666542", "CA");
      expect(result).toMatchObject({
        title: mockTrack.data[0].attributes.name,
        album: mockTrack.data[0].attributes.albumName,
        artist: mockTrack.data[0].attributes.artistName,
        unique_id: mockTrack.data[0].attributes.isrc,
        explicit: true,
        external_urls: {
          'appleMusic': 'song-url-test',
        },
      });
    });
  });
});
