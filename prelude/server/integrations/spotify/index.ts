import Service from './service';
import Repository from './repository';

const Spotify = (encodedSecret: string) => Service(Repository(encodedSecret));

export type Spotify = ReturnType<typeof Spotify>;
export default Spotify;
