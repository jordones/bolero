import express from "express";
import { Spotify } from '../integrations/spotify';
import { Platform, SongResolutionService } from "./types";
import { getServiceForUrl, isValidPlatform } from "./utils";

export default (service: SongResolutionService, spotify: Spotify) => {
  const router = express.Router();
  router.use(spotify.middleware);
  
  router.get('/', (req, res) => {
    res.send('Hello from song resolution');
  })

  router.post('/', async (req, res) => {
    const songUrl = req.body?.songUrl;
    if (!songUrl) {
      return res.status(400).send('missing songUrl in body');
    }
    const platform = getServiceForUrl(songUrl);
    if (!isValidPlatform(platform)) {
      return res.status(400).send('Unsupported platform');
    }
    switch(platform) {
      case Platform.appleMusic:
        break;
      case Platform.spotify:
        const result = await service.getTrackFromSpotify(songUrl);
        console.log('result i ncontroller', result);
        res.status(200).send(result);
        break;
      default:
        break;
    }
  })

  return router;
};
