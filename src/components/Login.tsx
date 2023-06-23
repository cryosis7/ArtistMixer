import { Navigate } from "react-router-dom";
import SpotifyAuth from "./SpotifyAuth";

const IP_ADDRESS = "http://192.168.1.8:3000/login";

interface LoginProps {
  code: string;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

export const Login: React.FC<LoginProps> = ({ code, token, setToken }) => {
  return token ? (
    <Navigate to={"/"} />
  ) : (
    <SpotifyAuth
      code={code}
      setToken={setToken}
      clientId={process.env.REACT_APP_SPOTIFY_CLIENT_ID ?? ""}
      redirectUri={IP_ADDRESS}
      scopes={["user-read-email", "user-read-private"]}
    />
  );
};
