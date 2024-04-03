import Grid2 from '@mui/material/Unstable_Grid2';
import React, { useState } from 'react';
import { PlaylistContract } from '../../models/datacontracts/PlaylistContract';
import { GeneratePlaylistControl } from './GeneratePlaylistControl';
import { SearchContainer } from './Search/SearchContainer';
import { LoadingSpinner } from './Search/LoadingSpinner';
import Typography from '@mui/material/Typography';
import { SelectedArtistsContainer } from './SelectedArtists/SelectedArtistsContainer';

export interface Artist {
  name: string;
}

export interface SelectedArtists {
  [id: string]: Artist;
}

interface SelectArtistsProps {
  setPlaylist: React.Dispatch<React.SetStateAction<PlaylistContract>>;
  token: string;
  selectedArtists: SelectedArtists;
  setSelectedArtists: React.Dispatch<React.SetStateAction<SelectedArtists>>;
}

export const SelectArtists: React.FC<SelectArtistsProps> = ({
  setPlaylist,
  token,
  selectedArtists,
  setSelectedArtists,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (token == null) {
    return <Typography>Error in SelectArtists.tsx: Token is empty</Typography>;
  }

  const addSelectedArtist = (artist: SpotifyApi.ArtistObjectFull) => {
    setSelectedArtists({
      ...selectedArtists,
      [artist.id]: {
        name: artist.name,
      },
    });
  };

  const toggleArtist = (artist: SpotifyApi.ArtistObjectFull) => {
    if (selectedArtists[artist.id] !== undefined) {
      removeArtist(artist.id);
    } else {
      addSelectedArtist(artist);
    }
  };

  const removeArtist = (artistId: string) => {
    delete selectedArtists[artistId];

    setSelectedArtists(selectedArtists);
  };

  return (
    <Grid2 container direction="column" padding={2}>
      <Grid2 textAlign="center">
        <GeneratePlaylistControl
          selectedArtists={selectedArtists}
          setPlaylist={setPlaylist}
          token={token}
          isLoading={() => isLoading}
          setIsLoading={setIsLoading}
        />
      </Grid2>
      <Grid2 container spacing={4} padding={{ sm: 2, md: 4 }}>
        {isLoading ? (
          <Grid2 xs>
            <LoadingSpinner />
          </Grid2>
        ) : (
          <>
            <Grid2 xs={12} md={4}>
              <SelectedArtistsContainer
                selectedArtists={selectedArtists}
                removeArtist={removeArtist}
              />
            </Grid2>
            <Grid2 xs>
              <SearchContainer
                toggleArtist={toggleArtist}
                selectedArtists={selectedArtists}
                token={token}
              />
            </Grid2>
          </>
        )}
      </Grid2>
    </Grid2>
  );
};
