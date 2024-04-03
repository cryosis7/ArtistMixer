import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import React from 'react';
import { SelectedArtists } from '../SelectArtists';
import { SelectedArtistsList } from './SelectedArtistsList';

interface SelectedArtistsContainerProps {
  selectedArtists: SelectedArtists;
  removeArtist: (artistId: string) => void;
}

export const SelectedArtistsContainer: React.FC<SelectedArtistsContainerProps> = ({
  selectedArtists,
  removeArtist,
}) => {
  return (
    <>
      <Typography variant="h2" gutterBottom>
        Artist Pool
      </Typography>
      <Typography gutterBottom>
        Artists that are added here will be used to generate your random playlist.
      </Typography>

      <Divider sx={{ my: 4, mx: 8 }} />

      {Object.keys(selectedArtists).length ? (
        <SelectedArtistsList selectedArtists={selectedArtists} removeArtist={removeArtist} />
      ) : (
        <Typography align="left" color="text.secondary">
          <i>
            It's lonely here.
            <br />
            Start by searching and selecting an artist to add them to the list.
          </i>
        </Typography>
      )}
    </>
  );
};
