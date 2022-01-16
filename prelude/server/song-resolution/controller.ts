import express from "express";
import { SongResolutionService } from "./types";

export default (service: SongResolutionService) => {
  const router = express.Router();

  // Add Routes here
  router.get('/', (req, res) => {
    res.send('Hello from song resolution');
  })

  return router;
};