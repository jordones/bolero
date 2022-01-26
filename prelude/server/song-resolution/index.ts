import Repository from './repository';
import Service from './service';
import Controller from './controller';
import { Spotify } from '../integrations/spotify';
import { AppleMusic } from '../integrations/apple-music';

export default (spotify: Spotify, appleMusic: AppleMusic) => Controller(Service(Repository(spotify, appleMusic)), spotify);
