import { PlaylistContract } from "../models/datacontracts/PlaylistContract";

export const createSpotifyPlaylist = async (
  name: string,
  playlist: PlaylistContract,
  token: string,
) => {
  const url =
    "https://jrfg22ir6f.execute-api.ap-southeast-2.amazonaws.com/api/AddRandomPlaylist";
  const params = new URLSearchParams();
  params.set("token", token);
  params.set("name", name);

  const response = await fetch(`${url}?${params.toString()}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(playlist.songs.map((song) => song.uri)),
  });

  if (response.ok) {
    // Handle successful response
    // For example, you can parse the response body as JSON if it returns any data
    // const data = await response.json();
    return true;
  } else {
    // Handle error response
    console.error(`Request failed with status ${response.status}`);
    return false;
  }
};
