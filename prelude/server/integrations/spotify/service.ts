import { Request, Response, NextFunction } from 'express';
import { database } from 'firebase-admin';
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
    async getSong(songId: string) {
      // TODO: determine a common song data format
      const { data } = await repository.fetchSongById(songId);
      console.log(data);
      const artistNameMap = data.artists.map(artist => artist.name);
      return data;
      return {
        title: data.name,
        album: data.album.name,
        artist: artistNameMap.join(', '),
      }
    },
  };
}
