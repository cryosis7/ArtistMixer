import * as React from "react";
import { useState, useEffect } from "react";

interface SpotifyAuthProps {
  clientId: string;
  redirectUri: string;
  scopes: string[];
  onAccessToken: (token: string) => void;
}

const SpotifyAuth: React.FC<SpotifyAuthProps> = ({
  clientId,
  redirectUri,
  scopes,
  onAccessToken,
}) => {
  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");
    const code = params.get("code");

    if (error) {
      console.error("Spotify authentication error:", error);
      return;
    }

    if (code) {
      fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${clientId}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString("base64")}`,
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: redirectUri,
        }).toString(),
      })
        .then((res) => res.json())
        .then((data) => {
          setAccessToken(data.access_token);
          onAccessToken(data.access_token);
        })
        .catch((error) => {
          console.error("Error fetching Spotify access token:", error);
        });
    }
  }, []);

  const authorizeSpotify = () => {
    const queryParams = new URLSearchParams({
      response_type: "code",
      client_id: clientId,
      scope: scopes.join(" "),
      redirect_uri: redirectUri,
    }).toString();

    window.location.href = `https://accounts.spotify.com/authorize?${queryParams}`;
  };

  return (
    <div>
      {accessToken ? (
        <p>Successfully authorized with Spotify</p>
      ) : (
        <button onClick={authorizeSpotify}>Authorize with Spotify</button>
      )}
    </div>
  );
};

export default SpotifyAuth;
