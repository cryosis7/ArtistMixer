/**
 * Gets a spotify token via PKCE once we have the code
 */
export const fetchSpotifyToken = async (code: string, state: string) => {
  const data = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: process.env.REACT_APP_SPOTIFY_REDIRECT_URI ?? "",
    client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID ?? "",
    code_verifier: generateCodeChallenge(state),
  });

  return fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Basic ${Buffer.from(
        `${process.env.REACT_APP_SPOTIFY_CLIENT_ID}:${process.env.REACT_APP_SPOTIFY_CLIENT_SECRET}`)
        .toString("base64")}`,
    },
    body: data.toString(),
  });
};

/**
 * Generates a PKCE pair
 */
export const generatePKCEPair = () => {
    