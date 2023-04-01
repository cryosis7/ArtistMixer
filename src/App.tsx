import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes, redirect } from "react-router-dom";
import SpotifyAuth from "./components/SpotifyAuth";

const IP_ADDRESS = "http://192.168.1.8:3000";

const App: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [searchResults, setSearchResults] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
      setCode(code);
      console.log("Code: ", code);
    }
  }, []);

  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/search/nf">Search</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <div>Generic Home Page.</div>
                <button onClick={() => console.log("Code: ", code)}>
                  Log Code
                </button>
              </>
            }
          />
          <Route
            path="/login"
            element={
              token ? (
                <div>Token aquired: {token}</div>
              ) : (
                <SpotifyAuth
                  code={code}
                  setToken={setToken}
                  clientId={process.env.REACT_APP_SPOTIFY_CLIENT_ID ?? ""}
                  redirectUri={IP_ADDRESS}
                  scopes={["user-read-email", "user-read-private"]}
                />
              )
            }
          />
          <Route
            path="/search/nf"
            element={
              <>
                <button
                  onClick={() => {
                    const url =
                      "https://jrfg22ir6f.execute-api.ap-southeast-2.amazonaws.com/api/spotify/search";
                    const params = new URLSearchParams();
                    params.set("q", "NF");
                    params.set("type", "artist");
                    params.set("token", token);
                    const requestUrl = `${url}?${params.toString()}`;

                    fetch(requestUrl, {
                      method: "GET",
                    })
                      .then((res) => res.json())
                      .then((data) => {
                        setSearchResults(JSON.stringify(data));
                        console.log(data);
                      })
                      .catch((err) => {
                        // If unauthorized, redirect to login
                        if (err.status === 401) {
                          redirect("/login");
                        }
                      });
                  }}
                >
                  Search
                </button>
                {searchResults ?? <div>{searchResults}</div>}
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
