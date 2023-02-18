import { useEffect, useState } from "react";

/**
 * This component is responsible for handling the authorization flow with Spotify.
 * It will redirect the user to the Spotify login page and then redirect back to
 * the app with an access token.
 */
export const Authorize = () => {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // when the component mounts, check the URL for an access token
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("access_token");
    const error = params.get("error");

    if (token) {
      setToken(token);
    }

    if (error) {
      setError(error);
    }
  }, []);

  if (error) {
    return <div>There was an error: {error}</div>;
  }

  if (token) {
    return (
      <div>
        Token: {token}
        <button onClick={() => setToken(null)}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      <a href="http://localhost:8888/login">Login with Spotify</a>
    </div>
  );
};
