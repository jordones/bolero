import Service from './service';
import Repository from './repository';
import { TokenArgs } from './types';

const AppleMusic = (tokenArgs: TokenArgs) => Service(Repository(tokenArgs));

export type AppleMusic = ReturnType<typeof AppleMusic>;
export default AppleMusic;
