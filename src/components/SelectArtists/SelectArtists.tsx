import Grid2 from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import { withAuth } from "../RequireAuth";
import { SearchContainer } from "./Search/SearchContainer";
import { SelectedMediaContainer } from "./SelectedMedia/SelectedMediaContainer";

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
}

const SelectArtists: React.FC<SelectArtistsProps> = ({ moveStep }) => {
  const [selectedMedia, setSelectedMedia] = useState<SelectedMedia>({});

  useEffect(() => {
    console.log(selectedMedia);
  }, [selectedMedia]);

  const addSelectedMedia = (media: SpotifyMedia) => {
    setSelectedMedia({
      ...selectedMedia,
      [media.type]: {
        ...selectedMedia[media.type],
        [media.id]: { name: media.name },
      },
    });
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
    <Grid2 container spacing={4} padding={{ xs: 2, sm: 4, md: 6 }}>
      <Grid2 xs={12} md={5} lg={4}>
        <SelectedMediaContainer
          selectedMedia={selectedMedia}
          removeArtist={removeArtist}
        />
      </Grid2>
      <Grid2 xs>
        <SearchContainer addSelectedMedia={addSelectedMedia} />
      </Grid2>
    </Grid2>
  );
};

export default withAuth(SelectArtists);
