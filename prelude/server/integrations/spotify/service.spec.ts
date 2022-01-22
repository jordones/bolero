import repository from './repository';
import Service from './service';
import { Repository } from './types';

const noOp: any = () => {};

describe('Spotify Integration', () => {
  describe('Service', () => {
    const repo: Repository = {
      accessTokenExpiry: undefined,
      loadAccessToken: jest.fn(),
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
  });
});
