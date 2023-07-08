import Grid2 from "@mui/material/Unstable_Grid2";
import React, { useState } from "react";
import { PlaylistContract } from "../../models/datacontracts/PlaylistContract";
import { withAuth } from "../RequireAuth";
import { GeneratePlaylistButton } from "./GeneratePlaylistButton";
import { SearchContainer } from "./Search/SearchContainer";
import { SelectedMediaContainer } from "./SelectedMedia/SelectedMediaContainer";
import { Navigate } from "react-router-dom";
import { LoadingSpinner } from "./Search/LoadingSpinner";

export type SpotifyMedia =
  | SpotifyApi.TrackObjectFull
  | SpotifyApi.ArtistObjectFull
  | SpotifyApi.AlbumObjectFull;

export interface MediaItem {
  [id: string]: {
    name: string;
    img?: string;
  };
}
export interface SelectedMedia {
  artist?: MediaItem;
  track?: MediaItem;
  album?: MediaItem;
}

interface SelectArtistsProps {
  moveStep: (arg0: "FORWARD" | "BACKWARD") => void;
  setPlaylist: React.Dispatch<PlaylistContract>;
  token?: string;
}

const SelectArtists: React.FC<SelectArtistsProps> = ({
  moveStep,
  setPlaylist,
  token,
}) => {
  const [selectedMedia, setSelectedMedia] = useState<SelectedMedia>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (token == null) {
    return <Navigate to="/login" />;
  }

  const addSelectedMedia = (media: SpotifyMedia) => {
    setSelectedMedia({
      ...selectedMedia,
      [media.type]: {
        ...selectedMedia[media.type],
        [media.id]: { name: media.name },
      },
    });
  };

  const toggleArtist = (artist: SpotifyApi.ArtistObjectFull) => {
    if (selectedMedia.artist?.[artist.id]) {
      removeArtist(artist.id);
    } else {
      addSelectedMedia(artist);
    }
  };

  const removeArtist = (artist: string) => {
    if (!selectedMedia.artist) {
      return;
    }

    delete selectedMedia.artist[artist];

    setSelectedMedia({
      ...selectedMedia,
      artist: {
        ...selectedMedia.artist,
      },
    });
  };

  return (
    <Grid2 container direction="column" padding={2}>
      <Grid2 textAlign="center">
        <GeneratePlaylistButton
          selectedArtists={selectedMedia}
          setPlaylist={setPlaylist}
          token={token}
          isLoading={() => isLoading}
          setIsLoading={setIsLoading}
        />
      </Grid2>
      <Grid2 container spacing={4} padding={{ sm: 2, md: 4 }}>
        {isLoading ? (
          <Grid2 xs>
            <LoadingSpinner />
          </Grid2>
        ) : (
          <>
            <Grid2 xs={12} md={4}>
              <SelectedMediaContainer
                selectedMedia={selectedMedia}
                removeArtist={removeArtist}
              />
            </Grid2>
            <Grid2 xs>
              <SearchContainer
                toggleArtist={toggleArtist}
                selectedMedia={selectedMedia}
              />
            </Grid2>
          </>
        )}
      </Grid2>
    </Grid2>
  );
};

export default withAuth(SelectArtists);
