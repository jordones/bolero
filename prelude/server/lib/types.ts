export interface BoleroTrack {
  title: string;
  album: string;
  artist: string;
  unique_id: string;
  explicit: boolean;
  external_urls: { 
    appleMusic?: string; 
    spotify?: string;
  },
}
