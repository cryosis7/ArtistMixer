import { Navigate } from "react-router-dom";
import SpotifyAuth from "./SpotifyAuth";
import { useEffect } from "react";

const IP_ADDRESS = "http://192.168.1.8:3000/login";

interface LoginProps {
  code: string;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

export const Login: React.FC<LoginProps> = ({ code, token, setToken }) => {
  useEffect(() => {
    if (code !== "") {
      const url =
        "https://jrfg22ir6f.execute-api.ap-southeast-2.amazonaws.com/api/authenticate";
      fetch(`${url}?code=${code}`)
        .then((res) => res.json())
        .then((data) => {
          setToken(data.token);
          localStorage.setItem("token", data.token);
        })
        .catch((err) => console.log(err));
    }
  }, [code, setToken]);

  return token ? (
    <Navigate to={"/"} />
  ) : (
    <SpotifyAuth
      clientId={process.env.REACT_APP_SPOTIFY_CLIENT_ID ?? ""}
      redirectUri={IP_ADDRESS}
      scopes={[
        "user-read-email",
        "user-read-private",
        "playlist-modify-public",
        "playlist-modify-private",
      ]}
    />
  );
};
