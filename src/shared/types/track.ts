import type { Image } from './image';
import type { Artist } from './playlist';

export interface AlbumSummary {
  id: string;
  name: string;
  images: Image[];
}

export interface TrackListItem {
  id: string;
  name: string;
  artists: Artist[];
  album: AlbumSummary;
  type: 'track';
}
