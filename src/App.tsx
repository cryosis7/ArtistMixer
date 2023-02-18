import React, { useEffect, useState } from "react";
import SpotifyAuth from "./components/SpotifyAuth";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

const App: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
      setAccessToken(code);
    }
  }, []);

  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/login"
            element={
              <SpotifyAuth
                clientId={process.env.REACT_APP_SPOTIFY_CLIENT_ID ?? ""}
                redirectUri="http://localhost:3000"
                scopes={["user-read-email", "user-read-private"]}
              />
            }
          />
          <Route
            path="/"
            element={
              <>
                {accessToken ? (
                  <p>Access token: {accessToken}</p>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
