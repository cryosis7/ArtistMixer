import Grid2 from "@mui/material/Unstable_Grid2";
import React, { useState } from "react";
import { PlaylistContract } from "../../models/datacontracts/PlaylistContract";
import { GeneratePlaylistControl } from "./GeneratePlaylistControl";
import { SearchContainer } from "./Search/SearchContainer";
import { SelectedMediaContainer } from "./SelectedMedia/SelectedMediaContainer";
import { LoadingSpinner } from "./Search/LoadingSpinner";
import Typography from "@mui/material/Typography";

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
  setPlaylist: React.Dispatch<PlaylistContract>;
  token: string;
}

export const SelectArtists: React.FC<SelectArtistsProps> = ({
  setPlaylist,
  token,
}) => {
  const [selectedMedia, setSelectedMedia] = useState<SelectedMedia>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (token == null) {
    return <Typography>Error in SelectArtists.tsx: Token is empty</Typography>;
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
        <GeneratePlaylistControl
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
                token={token}
              />
            </Grid2>
          </>
        )}
      </Grid2>
    </Grid2>
  );
};
