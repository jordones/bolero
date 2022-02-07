import { BoleroTrack } from "../../lib/types";
import { Repository } from "./types";

export default (repository: Repository) => {
  return {
    async getSong(songId: string, market: string): Promise<BoleroTrack> {
      // TODO: determine a common song data format
      const { data } = await repository.fetchSongById(songId, market);
      const song = data.data[0];
      return {
        title: song.attributes.name,
        album: song.attributes.albumName,
        artist: song.attributes.artistName,
        unique_id: song.attributes.isrc ?? "TODO-GENERATE_HASH",
        explicit: song.attributes.contentRating === 'explicit',
        external_urls: { appleMusic: song.attributes.url },
      }
    },
  };
}
