export interface PlaylistContract {
  version: string;
  songs: Song[];
}

export class Playlist implements PlaylistContract {
  version: string;
  songs: Song[];

  constructor() {
    this.version = '0.2';
    this.songs = [];
  }
}

export interface Song {
  id: string;
  name: string;
  externalUrl?: string;
  previewUrl?: string;
  artists: Artist[];
  uri: string;
}

export interface Artist {
  id: string;
  name: string;
}
