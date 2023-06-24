import { SelectedMediaList } from "./SelectedMediaList";
import React from "react";
import { SelectedMedia } from "../SelectArtists";
import { TempGeneratePlaylist } from "../../GeneratePlaylist/TempGeneratePlaylist";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

interface SelectedMediaContainerProps {
  selectedMedia: SelectedMedia;
}

export const SelectedMediaContainer: React.FC<SelectedMediaContainerProps> = ({
  selectedMedia,
}) => {
  return (
    <>
      <Typography variant="h2" sx={{ p: 2 }}>
        Artist Pool
      </Typography>
      <Typography gutterBottom>
        Artists that are added here will be used to generate your random
        playlist.
      </Typography>

      <Divider sx={{ my: 4, mx: 8 }} />

      {selectedMedia.artist ? (
        <SelectedMediaList selectedMedia={selectedMedia} />
      ) : (
        <Typography align="center" color="text.secondary">
          <i>
            It's lonely here.
            <br />
            Start by searching and selecting an artist to add them to the list.
          </i>
        </Typography>
      )}
    </>
  );
};
