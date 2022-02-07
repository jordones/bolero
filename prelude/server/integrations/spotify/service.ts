import { Request, Response, NextFunction } from 'express';
import { BoleroTrack } from '../../lib/types';
import { Repository } from "./types";

export default (repository: Repository) => {
  const middleware = async (_req: Request, _res: Response, next: NextFunction) => {
    const now = new Date()
    if (!repository.accessTokenExpiry || now > repository.accessTokenExpiry) {
      await repository.loadAccessToken();
    }
    next();
  }

  return {
    middleware,
    async getSong(songId: string): Promise<BoleroTrack> {
      // TODO: determine a common song data format
      const { data } = await repository.fetchSongById(songId);
      const artistNameMap = data.artists.map(artist => artist.name);
      return {
        title: data.name,
        album: data.album.name,
        artist: artistNameMap.join(', '),
        unique_id: data.external_ids?.isrc ?? "TODO-GENERATE_HASH",
        explicit: data.explicit,
        external_urls: data.external_urls,
      }
    },
  };
}
