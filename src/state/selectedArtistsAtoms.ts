import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { Artist } from '@shared/types/playlist';

export type ArtistData = Artist;

export const selectedArtistsAtom = atomWithStorage<Artist[]>(
  'selectedArtists',
  []
);

export const selectedArtistIdsAtom = atom((get) => {
  const artists = get(selectedArtistsAtom);
  return new Set(artists.map((a) => a.id));
});

export const addArtistAtom = atom(null, (get, set, artist: Artist) => {
  const ids = get(selectedArtistIdsAtom);
  if (!ids.has(artist.id)) {
    const current = get(selectedArtistsAtom);
    set(selectedArtistsAtom, [...current, artist]);
  }
});

export const removeArtistAtom = atom(null, (get, set, artistId: string) => {
  const current = get(selectedArtistsAtom);
  set(
    selectedArtistsAtom,
    current.filter((a) => a.id !== artistId)
  );
});

export const clearArtistsAtom = atom(null, (_get, set) => {
  set(selectedArtistsAtom, []);
});
