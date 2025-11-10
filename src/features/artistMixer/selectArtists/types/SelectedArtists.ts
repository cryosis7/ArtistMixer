export interface Artist {
  name: string;
}

export interface SelectedArtists {
  [id: string]: Artist;
}
