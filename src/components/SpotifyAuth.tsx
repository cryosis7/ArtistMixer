import * as React from "react";
import { SetStateAction } from "react";
import { RequestToken } from "./RequestToken";
import Button from "@mui/material/Button";

interface SpotifyAuthProps {
  code: string;
  setToken: React.Dispatch<SetStateAction<string>>;
  clientId: string;
  redirectUri: string;
  scopes: string[];
}

/**
 * Authorizes the user with Spotify
 * @param {string} code
 * @param {React.Dispatch<SetStateAction<string>>} setToken
 * @param {string} clientId
 * @param {string} redirectUri
 * @param {string[]} scopes
 * @returns {JSX.Element} The button to authorize the user or the request token component if the code is present
 */
const SpotifyAuth: React.FC<SpotifyAuthProps> = ({
  code,
  setToken,
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

  return code ? (
    <RequestToken code={code} setToken={setToken} />
  ) : (
    <Button variant="contained" role="link" onClick={authorizeSpotify}>
      Authorize Spotify
    </Button>
  );
};

export default SpotifyAuth;
