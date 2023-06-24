import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import React from "react";
import { SelectedMedia } from "../SelectArtists";
import { SelectedMediaList } from "./SelectedMediaList";

interface SelectedMediaContainerProps {
  selectedMedia: SelectedMedia;
  removeArtist: (artistId: string) => void;
}

export const SelectedMediaContainer: React.FC<SelectedMediaContainerProps> = ({
  selectedMedia,
  removeArtist,
}) => {
  return (
    <>
      <Typography variant="h2" gutterBottom>
        Artist Pool
      </Typography>
      <Typography gutterBottom>
        Artists that are added here will be used to generate your random
        playlist.
      </Typography>

      <Divider sx={{ my: 4, mx: 8 }} />

      {selectedMedia.artist ? (
        <SelectedMediaList
          selectedMedia={selectedMedia}
          removeArtist={removeArtist}
        />
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
