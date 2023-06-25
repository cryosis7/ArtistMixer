import { List } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { SelectedMedia, SpotifyMedia } from "../../SelectArtists";
import { ArtistTile } from "./ArtistTile";
import { TrackItem } from "./TrackItem";
import { useMemo } from "react";

interface MediaListProps {
  media: SpotifyApi.SearchResponse;
  addItem: (item: SpotifyMedia) => void;
  selectedMedia: SelectedMedia;
}

export const SpotifyMediaList: React.FC<MediaListProps> = ({
  media,
  addItem,
  selectedMedia,
}) => {
  const artistIds = useMemo(
    () => Object.keys(selectedMedia.artist ?? []),
    [selectedMedia]
  );

  if (media.artists) {
    return (
      <Grid2 container spacing={0.5} columns={{ xs: 1, sm: 3, lg: 4 }}>
        {media.artists.items.map((artist) => (
          <Grid2 key={artist.id} xs={1}>
            <ArtistTile
              artist={artist}
              addArtist={addItem}
              selected={artistIds.includes(artist.id)}
            />
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
