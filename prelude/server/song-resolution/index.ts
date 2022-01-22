import Repository from './repository';
import Service from './service';
import Controller from './controller';
import { Spotify } from '../integrations/spotify';

export default (spotify: Spotify) => Controller(Service(Repository(spotify)), spotify);
