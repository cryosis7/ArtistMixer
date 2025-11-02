import Grid2 from '@mui/material/GridLegacy';
import React from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { SearchContainer } from './Search/SearchContainer';
import { SelectedArtistsContainer } from './SelectedArtists/SelectedArtistsContainer';
import { selectedArtistsAtom, addArtistAtom, removeArtistAtom } from '@state/selectedArtistsAtoms';

export const SelectArtists: React.FC = () => {
  const [selectedArtists] = useAtom(selectedArtistsAtom);
  const addArtist = useSetAtom(addArtistAtom);
  const removeArtist = useSetAtom(removeArtistAtom);

  const toggleArtist = (artist: SpotifyApi.ArtistObjectFull) => {
    const isSelected = selectedArtists.some((a) => a.id === artist.id);
    if (isSelected) {
      removeArtist(artist.id);
    } else {
      addArtist({ id: artist.id, name: artist.name });
    }
  };

  return (
    <Grid2 container spacing={4} padding={{ sm: 2, md: 4 }}>
      <Grid2 xs={12} md={4}>
        <SelectedArtistsContainer removeArtist={removeArtist} />
      </Grid2>
      <Grid2 xs>
        <SearchContainer
          toggleArtist={toggleArtist}
        />
      </Grid2>
    </Grid2>
  );
};
