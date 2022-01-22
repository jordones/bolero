import Service from './service';
import Repository from './repository';

const AppleMusic = (encodedSecret: string) => Service(Repository(encodedSecret));

export type AppleMusic = ReturnType<typeof AppleMusic>;
export default AppleMusic;
