import express from "express";
import { Platform, SongResolutionService } from "./types";
import { getServiceForUrl, isValidPlatform } from "./utils";

export default (service: SongResolutionService) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.send('Hello from song resolution');
  })

  router.post('/', (req, res) => {
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
        break;
      default:
        break;
    }
  })

  return router;
};