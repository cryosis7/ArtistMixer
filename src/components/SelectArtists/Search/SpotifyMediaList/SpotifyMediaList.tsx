import ImageList from "@mui/material/ImageList";
import { ArtistTile } from "./ArtistTile";
import { List, useMediaQuery, useTheme } from "@mui/material";
import { TrackItem } from "./TrackItem";
import { SpotifyMedia } from "../../SelectArtists";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

interface MediaListProps {
  media: SpotifyApi.SearchResponse;
  addItem: (item: SpotifyMedia) => void;
}

export const SpotifyMediaList: React.FC<MediaListProps> = ({
  media,
  addItem,
}) => {
  // const theme = useTheme();
  // const usingSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  // const cols = usingSmallScreen ? 1 : 4;

  if (media.artists) {
    return (
      <Grid2 container spacing={0.5} columns={{ xs: 1, sm: 3, lg: 4 }}>
        {media.artists.items.map((artist) => (
          <Grid2 key={artist.id} xs={1}>
            <ArtistTile artist={artist} addArtist={addItem} />
          </Grid2>
        ))}
      </Grid2>
    );
  }

  if (media.tracks) {
    return (
      <List>
        {media.tracks.items.map((track) => (
          <TrackItem track={track} key={track.id} addTrack={addItem} />
        ))}
      </List>
    );
  }

  return (
    <div>
      <pre>{JSON.stringify(media, null, 2)}</pre>
    </div>
  );
};
