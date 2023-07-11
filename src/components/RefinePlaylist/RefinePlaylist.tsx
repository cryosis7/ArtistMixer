import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useState } from "react";
import { PlaylistContract } from "../../models/datacontracts/PlaylistContract";
import { steps } from "../Navigation/NavigationBar";
import { DraftPlaylist } from "./DraftPlaylist";
import { createSpotifyPlaylist } from "../../scripts/CreateSpotifyPlaylist";

interface RefinePlaylistProps {
  playlist: PlaylistContract;
  setPlaylist: React.Dispatch<PlaylistContract>;
  setActiveStep: React.Dispatch<number>;
  token: string;
}

export const RefinePlaylist: React.FC<RefinePlaylistProps> = ({
  playlist,
  setPlaylist,
  setActiveStep,
  token,
}) => {
  const [playlistName, setPlaylistName] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);

  if (token == null || token === "") {
    return <Typography>Error in RefinePlaylist.tsx: Token is empty</Typography>;
  }

  const handleSubmit = () => {
    if (playlistName === "") {
      setHasError(true);
      return;
    }

    createSpotifyPlaylist(playlistName, playlist, token);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (hasError && event.target.value !== "") {
      setHasError(false);
    }
    setPlaylistName(event.target.value);
  };

  return (
    <Grid2
      container
      direction="column"
      justifyContent="flex-start"
      padding={2}
      spacing={2}
      alignContent="center"
    >
      {playlist.songs.length > 0 ? (
        <>
          <Grid2>
            <TextField
              label="Playlist Name"
              onChange={handleChange}
              value={playlistName}
              fullWidth
              error={hasError}
            />
          </Grid2>
          <Grid2 textAlign="center" paddingBottom={4}>
            <Button variant="contained" onClick={handleSubmit}>
              Save Playlist To Spotify
            </Button>
          </Grid2>
          <Grid2>
            <Divider />
          </Grid2>
          <Grid2 xs sm={9} md={6} lg={5}>
            <Typography
              variant="body1"
              fontStyle="italic"
              color="GrayText"
              align="center"
            >
              This is your random playlist
            </Typography>
            <Typography
              variant="body1"
              fontStyle="italic"
              color="GrayText"
              align="center"
              gutterBottom
            >
              You can remove any songs you wish before saving it to Spotify
            </Typography>
            <DraftPlaylist playlist={playlist} setPlaylist={setPlaylist} />
          </Grid2>
        </>
      ) : (
        <Grid2 textAlign="center">
          <Typography
            variant="body1"
            fontStyle="italic"
            color="GrayText"
            align="center"
          >
            You haven't created a playlist yet
          </Typography>
          <Button
            onClick={() => setActiveStep(steps.indexOf("SELECT ARTISTS"))}
          >
            Start Creating
          </Button>
        </Grid2>
      )}
    </Grid2>
  );
};
