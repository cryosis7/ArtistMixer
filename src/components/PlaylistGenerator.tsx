import Grid2 from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import { withAuth } from "./RequireAuth";
import { SearchContainer } from "./Search/SearchContainer";
import {
  SelectedMedia,
  SelectedMediaContainer,
  SpotifyMedia,
} from "./SelectedMedia/SelectedMediaContainer";

interface PlaylistGeneratorProps {}

const PlaylistGenerator: React.FC<PlaylistGeneratorProps> = () => {
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

  return (
    <Grid2 container spacing={2}>
      <Grid2 xs={6} md={4}>
        <SelectedMediaContainer selectedMedia={selectedMedia} />
      </Grid2>
      <Grid2 xs>
        <SearchContainer addSelectedMedia={addSelectedMedia} />
      </Grid2>
    </Grid2>
  );
};

export default withAuth(PlaylistGenerator);
