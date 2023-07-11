import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from "react";

interface SpotifyAuthProps {
  clientId: string;
  scopes: string[];
}

/**
 * Authorizes the user with Spotify
 * @param {string} clientId
 * @param {string[]} scopes
 * @returns {JSX.Element} The button to authorize the user or the request token component if the code is present
 */
const SpotifyAuth: React.FC<SpotifyAuthProps> = ({ clientId, scopes }) => {
  const authorizeSpotify = () => {
    const queryParams = new URLSearchParams({
      response_type: "code",
      client_id: clientId,
      scope: scopes.join(" "),
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

export default SpotifyAuth;
