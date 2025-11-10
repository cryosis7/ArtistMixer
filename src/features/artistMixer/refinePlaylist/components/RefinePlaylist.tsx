import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/GridLegacy';
import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { steps } from '@shared/constants/steps';
import { DraftPlaylist } from './DraftPlaylist';
import { createSpotifyPlaylist } from '@features/artistMixer/generatePlaylist/services/createSpotifyPlaylist';
import { draftPlaylistAtom } from '@state/playlistAtoms';
import { useAuth } from '@features/auth/hooks/useAuth';

interface RefinePlaylistProps {
  setActiveStep: React.Dispatch<number>;
}

interface SavedPlaylistState {
  hasSaved: boolean;
  success?: boolean;
}

export const RefinePlaylist: React.FC<RefinePlaylistProps> = ({
  setActiveStep,
}) => {
  const [playlist] = useAtom(draftPlaylistAtom);
  const { token } = useAuth();
  const [playlistName, setPlaylistName] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);
  const [savedPlaylistState, setSavedPlaylistState] = useState<SavedPlaylistState>({
    hasSaved: false,
  });

  if (token == null || token === '') {
    return <Typography>Error in RefinePlaylist.tsx: Token is empty</Typography>;
  }

  const handleSubmit = async () => {
    if (playlistName === '') {
      setHasError(true);
      return;
    }

    const saveState = await createSpotifyPlaylist(playlistName, playlist, token);
    setSavedPlaylistState({
      hasSaved: true,
      success: saveState,
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (hasError && event.target.value !== '') {
      setHasError(false);
    }
    setPlaylistName(event.target.value);
  };

  return (
    <Grid2
      container
      direction="column"
      justifyContent="flex-start"
      padding={2}
      spacing={2}
      alignContent="center"
    >
      {playlist.songs.length > 0 ? (
        <>
          <Grid2>
            <TextField
              label="Playlist Name"
              onChange={handleChange}
              value={playlistName}
              fullWidth
              error={hasError}
            />
          </Grid2>
          <Grid2 textAlign="center" paddingBottom={4}>
            {!savedPlaylistState.hasSaved ? (
              <Button variant="contained" onClick={handleSubmit}>
                Save Playlist To Spotify
              </Button>
            ) : (
              <Typography variant="body1" fontStyle="italic" align="center" color="GrayText">
                {savedPlaylistState.success
                  ? 'Playlist Saved'
                  : 'There was an error saving your playlist'}
              </Typography>
            )}
          </Grid2>
          <Grid2>
            <Divider />
          </Grid2>
          <Grid2 xs sm={9} md={6} lg={5}>
            <Typography variant="body1" fontStyle="italic" color="GrayText" align="center">
              This is your random playlist
            </Typography>
            <Typography
              variant="body1"
              fontStyle="italic"
              color="GrayText"
              align="center"
              gutterBottom
            >
              You can remove any songs you wish before saving it to Spotify
            </Typography>
            <DraftPlaylist />
          </Grid2>
        </>
      ) : (
        <Grid2 textAlign="center">
          <Typography variant="body1" fontStyle="italic" color="GrayText" align="center">
            You haven't created a playlist yet
          </Typography>
          <Button onClick={() => setActiveStep(steps.indexOf('SELECT ARTISTS'))}>
            Start Creating
          </Button>
        </Grid2>
      )}
    </Grid2>
  );
};
