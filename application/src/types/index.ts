export interface Track {
  id: number;
  title: string;
  artist: string;
  album?: string;
  duration: string;
  url?: string;
}

export interface Playlist {
  id: number;
  name: string;
  tracks: Track[];
  coverImage?: string;
}