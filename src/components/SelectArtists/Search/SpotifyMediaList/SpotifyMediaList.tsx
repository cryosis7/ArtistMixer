import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useMemo } from "react";
import { SelectedMedia } from "../../SelectArtists";
import { ArtistTile } from "./ArtistTile";

interface MediaListProps {
  media: SpotifyApi.SearchResponse;
  toggleArtist: (item: SpotifyApi.ArtistObjectFull) => void;
  selectedMedia: SelectedMedia;
}

export const SpotifyMediaList: React.FC<MediaListProps> = ({
  media,
  toggleArtist,
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
              toggleArtist={toggleArtist}
              selected={artistIds.includes(artist.id)}
            />
          </Grid2>
        ))}
      </Grid2>
    );
  }
  return (
    <>
      <p>media.artists is undefined</p>
    </>
  );
};
