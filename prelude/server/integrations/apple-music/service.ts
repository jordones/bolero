import { Repository } from "./types";

export default (repository: Repository) => {
  return {
    async getSong(songId: string, market: string) {
      // TODO: determine a common song data format
      const { data } = await repository.fetchSongById(songId, market);
      console.log('fetched song');
      console.log(data);
      // return data;
      const song = data.data[0];
      // const artistNameMap = data.artists.map(artist => artist.name);
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
