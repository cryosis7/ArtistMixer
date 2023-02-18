import * as React from "react";

interface SpotifyAuthProps {
  clientId: string;
  redirectUri: string;
  scopes: string[];
}

const SpotifyAuth: React.FC<SpotifyAuthProps> = ({
  clientId,
  redirectUri,
  scopes,
}) => {
  const authorizeSpotify = () => {
    const queryParams = new URLSearchParams({
      response_type: "code",
      client_id: clientId,
      scope: scopes.join(" "),
      redirect_uri: redirectUri,
    }).toString();

    window.location.href = `https://accounts.spotify.com/authorize?${queryParams}`;
  };

  return <button onClick={authorizeSpotify}>Authorize with Spotify</button>;
};

export default SpotifyAuth;
