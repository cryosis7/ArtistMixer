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
  const [code, setCode] = useState<string>("");
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
      setCode(code);
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
                {code ? (
                  <>
                    <div>
                      <p>Code: {code}</p>
                      {token ?? <p>Token: {token}</p>}
                    </div>
                    <button
                      onClick={() => {
                        const url =
                          "https://jrfg22ir6f.execute-api.ap-southeast-2.amazonaws.com/api/authenticate";
                        fetch(`${url}?code=${code}`)
                          .then((res) => res.json())
                          .then((data) => {
                            setToken(data.access_token);
                          });
                      }}
                    >
                      Get Token
                    </button>
                  </>
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
