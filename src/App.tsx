import React, { useState } from "react";
import SpotifyAuth from "./components/SpotifyAuth";

const App: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string>("");

  return (
    <div>
      <p>Process env: {JSON.stringify(process.env)}</p>
      {accessToken ? (
        <p>Access token: {accessToken}</p>
      ) : (
        <SpotifyAuth
          clientId={process.env.REACT_APP_SPOTIFY_CLIENT_ID ?? ""}
          redirectUri="http://localhost:3000"
          scopes={["user-read-email", "user-read-private"]}
          onAccessToken={setAccessToken}
        />
      )}
    </div>
  );
};

export default App;
