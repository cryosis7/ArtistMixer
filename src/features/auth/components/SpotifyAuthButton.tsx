import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import * as React from 'react';

interface SpotifyAuthButtonProps {
  clientId: string;
  scopes: string[];
}

const SpotifyAuthButton: React.FC<SpotifyAuthButtonProps> = ({ clientId, scopes }) => {
  const authorizeSpotify = () => {
    const queryParams = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      scope: scopes.join(' '),
      redirect_uri: `${window.location.origin}/ArtistMixer/`,
    }).toString();

    window.location.href = `https://accounts.spotify.com/authorize?${queryParams}`;
  };

  return (
    <Box textAlign="center" padding={6}>
      <Button variant="contained" role="link" onClick={authorizeSpotify}>
        Authorize Spotify
      </Button>
    </Box>
  );
};

export default SpotifyAuthButton;
