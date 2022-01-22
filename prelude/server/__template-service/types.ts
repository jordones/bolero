import Repository from './repository';
import Service from './service';
import Controller from './controller';

export type Repository = ReturnType<typeof Repository>;
export type Service = ReturnType<typeof Service>;
export type Controller = ReturnType<typeof Controller>;
  