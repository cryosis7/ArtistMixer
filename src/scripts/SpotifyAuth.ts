const SCOPES = [
  "user-read-email",
  "user-read-private",
  "playlist-modify-public",
  "playlist-modify-private",
];
const CLIENT_ID = process.env["REACT_APP_SPOTIFY_CLIENT_ID"] ?? "";

export const getCode = () => {
  const queryParams = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    scope: SCOPES.join(" "),
    redirect_uri: `${window.location.origin}/ArtistMixer/`,
  }).toString();

  window.location.href = `https://accounts.spotify.com/authorize?${queryParams}`;
};

export const getToken = async (code: string): Promise<string> => {
  if (code !== "") {
    const url =
      "https://jrfg22ir6f.execute-api.ap-southeast-2.amazonaws.com/api/authenticate";

    try {
      const res = await fetch(`${url}?code=${code}`);
      const data = await res.json();

      const token = data.token as string;
      sessionStorage.setItem("token", token);
      sessionStorage.removeItem("code");

      return data.token;
    } catch (err) {
      console.log(JSON.stringify(err));
      throw err;
    }
  }
  throw new Error("Can't get token - Empty code");
};

export const isTokenValid = (token: string): boolean => {
  // TODO add to backend
  return token !== "";
};