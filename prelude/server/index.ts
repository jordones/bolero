import dotenv from 'dotenv';
import { AddressInfo } from 'node:net';
import Application from './application';
import Firebase from './lib/firebase';
import Spotify from './integrations/spotify';
import SongResolution from './song-resolution';
import AppleMusic from './integrations/apple-music';

dotenv.config();

const application = Application();
// const firebase = Firebase();
const spotify = Spotify(process.env.spotify_client_encoded!);
const appleMusic = AppleMusic({
  keyId: process.env.apple_music_key_id!,
  teamId: process.env.apple_team_id!,
  privateKey: process.env.apple_music_key_encoded!,
});

const port = Number.parseInt(process.env.PORT ?? "3000", 10);

const main = async () => {
  application.get('/health', (req, res) => {
    res.send('online');
  })

  application.use('/song-resolution', SongResolution(spotify, appleMusic));

  // custom 404 page to avoid html
  application.use((_, res, _2) => res.sendStatus(404));

  const server = application.listen(port, () => {
    const host = server.address();
    const address = (host as AddressInfo).address;
    const port = (host as AddressInfo).port;    
    console.log(`Template server up and running, listening at http://${address}:${port}`); // eslint-disable-line no-console
  });
}

main();

process.on('uncaughtException', (error) => {
  // logger.error('uncaught exception', formatError(error), () => process.exit(1));
});

process.on('unhandledRejection', (error) => {
  // logger.error('unhandled rejection', formatError(error), () => process.exit(1));
});
