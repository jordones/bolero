import { Request, Response, NextFunction } from 'express';
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
    middleware
  };
}
