import React, { useState } from 'react';
import { GeneratePlaylistControl } from './GeneratePlaylistControl';
import { SelectedArtists } from '../SelectArtists/SelectArtists';
import { PlaylistContract } from '../../models/datacontracts/PlaylistContract';
import { LoadingSpinner } from '../SelectArtists/Search/LoadingSpinner';
import Grid2 from '@mui/material/Unstable_Grid2';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import Typography from '@mui/material/Typography';

interface GenerateProps {
  selectedArtists: SelectedArtists;
  setPlaylist: React.Dispatch<React.SetStateAction<PlaylistContract>>;
  token: string;
}

export const Generate = ({ setPlaylist, token, selectedArtists }: GenerateProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [randomisationMode, setRandomisationMode] = useState<string>('roundRobin');

  let descriptiveText = '';
  if (randomisationMode === 'roundRobin') {
    descriptiveText =
      'A random song will be taken from each artist, one by one, until the playlist is full.';
  } else if (randomisationMode === 'artist') {
    descriptiveText =
      'An artist will be chosen randomly, then a song from that artist will be chosen randomly. This is repeated until the playlist is full';
  } else if (randomisationMode === 'song') {
    descriptiveText =
      'Every song, from every artist, is combined. The songs are then picked randomly from the list until the playlist is full';
  }

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <Grid2
      container
      spacing={4}
      padding={{ sm: 2, md: 4 }}
      alignContent="center"
      alignItems="center"
      direction="column"
    >
      <Grid2>
        <FormControl>
          <FormLabel id="randomisation-options-label">Randomisation Mode</FormLabel>
          <RadioGroup
            aria-labelledby="randomisation-options-label"
            name="randomisation-options"
            onChange={(event) => setRandomisationMode(event.target.value)}
            value={randomisationMode}
          >
            <FormControlLabel value="roundRobin" control={<Radio />} label="Round Robin" />
            <FormControlLabel value="artist" control={<Radio />} label="Random Artist" />
            <FormControlLabel value="song" control={<Radio />} label="Random Song" />
          </RadioGroup>
        </FormControl>
      </Grid2>
      <Grid2>
        <Typography variant="body1">{descriptiveText}</Typography>
      </Grid2>
      <Grid2>
        <GeneratePlaylistControl
          selectedArtists={selectedArtists}
          setPlaylist={setPlaylist}
          token={token}
          isLoading={() => isLoading}
          setIsLoading={setIsLoading}
        />
      </Grid2>
    </Grid2>
  );
};
