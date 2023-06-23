import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { ToTitleCase } from "../../../Utils";
import DEFAULT_AVATAR_URL from "../../../images/2x/baseline_person_black_48dp.png";

interface ArtistTileProps {
  artist: SpotifyApi.ArtistObjectFull;
  addArtist: (artist: SpotifyApi.ArtistObjectFull) => void;
}

export const ArtistTile: React.FC<ArtistTileProps> = ({
  artist,
  addArtist,
}) => {
  const srcSet = artist.images.length
    ? artist.images.map((image) => `${image.url} ${image.width}w`).join(", ")
    : DEFAULT_AVATAR_URL;

  return (
    <Button onClick={() => addArtist(artist)}>
      <ImageListItem>
        <img srcSet={srcSet} width={"100%"} alt={artist.name} loading="lazy" />
        <ImageListItemBar
          title={artist.name}
          subtitle={<span>{ToTitleCase(artist.type)}</span>}
          position={artist.images.length > 0 ? "bottom" : "below"}
          sx={{ color: "black" }}
        >
          <AddIcon fontSize="large" color="inherit" />
        </ImageListItemBar>
      </ImageListItem>
    </Button>
  );
};
