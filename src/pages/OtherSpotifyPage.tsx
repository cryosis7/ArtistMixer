import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useAuth} from '@features/auth/hooks/useAuth';
import {getCode} from '@features/auth/services/spotifyAuth';
import {LoadingSpinner} from '@features/selectArtists/components/Search/LoadingSpinner';

export const OtherSpotifyPage: React.FC = () => {
  const { isAuthenticated, isAuthenticating } = useAuth();

  if (isAuthenticating) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return (
      <Box textAlign="center" padding={6}>
        <Typography variant="h5" gutterBottom>
          Please authorize Spotify to continue
        </Typography>
        <Button variant="contained" role="link" onClick={getCode}>
          Authorize Spotify
        </Button>
      </Box>
    );
  }

  return (
    <Box padding={4}>
      <Typography variant="h4" gutterBottom>
        Other Spotify Feature
      </Typography>
      <Typography variant="body1">
        This is a placeholder for another Spotify-related feature.
        You can implement any functionality here that uses the Spotify API.
      </Typography>
    </Box>
  );
};

