import ImageList from "@mui/material/ImageList";
import { ArtistTile } from "./ArtistTile";

interface MediaListProps {
  media: SpotifyApi.SearchResponse;
}

export const SpotifyMediaList: React.FC<MediaListProps> = ({ media }) => {
  if (media.artists) {
    return (
      <ImageList cols={4}>
        {media.artists.items.map((artist) => (
          <ArtistTile artist={artist} />
        ))}
      </ImageList>
    );
  }

  return (
    <div>
      <pre>{JSON.stringify(media, null, 2)}</pre>
    </div>
  );
};
