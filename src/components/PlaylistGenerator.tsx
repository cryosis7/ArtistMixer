import Grid from "@mui/material/Grid";
import {
  SourceMedia,
  SourceMediaContainer,
  SpotifyMedia,
} from "./SourceMedia/SourceMediaContainer";
import { useEffect, useState } from "react";
import { SearchContainer } from "./Search/SearchContainer";
import Grid2 from "@mui/material/Unstable_Grid2";

interface PlaylistGeneratorProps {}

export const PlaylistGenerator: React.FC<PlaylistGeneratorProps> = () => {
  const [sourceMedia, setSourceMedia] = useState<SourceMedia>({});

  useEffect(() => {
    console.log(sourceMedia);
  }, [sourceMedia]);

  const addSourceMedia = (media: SpotifyMedia) => {
    setSourceMedia({
      ...sourceMedia,
      [media.type]: {
        ...sourceMedia[media.type],
        [media.id]: { name: media.name },
      },
    });
  };

  return (
    <Grid2 container spacing={2}>
      <Grid2 xs={6} md={4}>
        <SourceMediaContainer sourceMedia={sourceMedia} />
      </Grid2>
      <Grid2 xs>
        <SearchContainer addSourceMedia={addSourceMedia} />
      </Grid2>
    </Grid2>
  );
};
