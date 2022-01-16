import Repository from './repository';
import Service from './service';
import Controller from './controller';

export type SongResolutionRepository = ReturnType<typeof Repository>;
export type SongResolutionService = ReturnType<typeof Service>;
export type SongResolutionController = ReturnType<typeof Controller>;
  