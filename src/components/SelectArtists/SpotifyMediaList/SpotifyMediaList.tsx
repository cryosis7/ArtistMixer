import ImageList from "@mui/material/ImageList";
import { ArtistTile } from "./ArtistTile";
import { List } from "@mui/material";
import { TrackItem } from "./TrackItem";
import { SpotifyMedia } from "../SelectArtists";

interface MediaListProps {
  media: SpotifyApi.SearchResponse;
  addItem: (item: SpotifyMedia) => void;
}

export const SpotifyMediaList: React.FC<MediaListProps> = ({
  media,
  addItem,
}) => {
  if (media.artists) {
    return (
      <ImageList cols={4}>
        {media.artists.items.map((artist) => (
          <ArtistTile artist={artist} addArtist={addItem} key={artist.id} />
        ))}
      </ImageList>
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
