import React, { useEffect, useState } from "react";
import SpotifyAuth from "./components/SpotifyAuth";
import { BrowserRouter, Routes, Route, Link, redirect } from "react-router-dom";

const IP_ADDRESS = "http://192.168.1.8:3000";

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
            <li>
              <a href="/search/nf">Search</a>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/login"
            element={
              <SpotifyAuth
                clientId={process.env.REACT_APP_SPOTIFY_CLIENT_ID ?? ""}
                redirectUri={IP_ADDRESS}
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
                          .then(() => console.log("authentication complete"))
                          .catch((err) => console.log(err))
                          .finally(() => {
                            redirect("/search/nf");
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
          <Route
            path="/search/nf"
            element={
              <button
                onClick={() => {
                  const url =
                    "https://jrfg22ir6f.execute-api.ap-southeast-2.amazonaws.com/api/spotify/search";
                  fetch(`${url}?q=NF&type=artist`, {
                    method: "GET",
                    credentials: "include",
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      console.log(data);
                    });
                }}
              >
                Search
              </button>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
