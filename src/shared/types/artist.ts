import type { Image } from './image';

export interface SearchArtist {
  id: string;
  name: string;
  images: Image[];
}
