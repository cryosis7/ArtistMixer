export interface PlaylistContract {
  version: string;
  songs?: Song[];
}

export interface Song {
  id?: string;
  name?: string;
  externalUrl?: string;
  previewUrl?: string;
  artists?: Artist[];
}

export interface Artist {
  id?: string;
  name?: string;
}
