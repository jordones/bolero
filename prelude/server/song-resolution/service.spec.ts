import Service from './service';

describe('Song Resolution', () => {
  describe('Service', () => {
    const repository = {
      fetchTrackFromSpotify: jest.fn(),
      fetchTrackFromAppleMusic: jest.fn(),
    };
    it('getTrackFromSpotify', async () => {
      repository.fetchTrackFromSpotify.mockResolvedValue({ hello: 'world' });
      const service = Service(repository);
      const result = await service.getTrackFromSpotify('https://open.spotify.com/track/44Zf9Ew6cYzkuhUz3SXUPU?si=41311f2dbb9647ea');
      test.todo('Add API to repository');
    });
    it('getTrackFromAppleMusic', async () => {
      repository.fetchTrackFromAppleMusic.mockResolvedValue({ hello: 'world' });
      const service = Service(repository);
      const result = await service.getTrackFromAppleMusic('123', 'ca');
      test.todo('Add API to repository');    
    });
  });
});
