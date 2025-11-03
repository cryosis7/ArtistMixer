import type { PlaylistContract } from '@shared/types/playlist';
import { apiPost } from '@shared/utils/apiClient';

export const createSpotifyPlaylist = async (
  name: string,
  playlist: PlaylistContract,
  token: string,
) => {
  const trackUris = playlist.songs.map((song) => song.uri);

  const response = await apiPost('/playlists/random', token, trackUris, { name });

  if (response.ok) {
    // Handle successful response
    const data = await response.json();
    console.log('Playlist created:', data);
    return true;
  } else {
    // Handle error response
    const errorText = await response.text();
    console.error(`Request failed with status ${response.status}: ${errorText}`);
    return false;
  }
};
