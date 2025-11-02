import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { Playlist, type PlaylistContract } from '@shared/types/playlist';

export const draftPlaylistAtom = atomWithStorage<PlaylistContract>(
  'draftPlaylist',
  new Playlist()
);

export const playlistLengthAtom = atom((get) => {
  const playlist = get(draftPlaylistAtom);
  return playlist.songs.length;
});

export const clearPlaylistAtom = atom(null, (_get, set) => {
  set(draftPlaylistAtom, new Playlist());
});
