import ImageListItem from "@mui/material/ImageListItem";
import { ToTitleCase } from "../../Utils";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import DEFAULT_AVATAR_URL from "../../images/2x/baseline_person_black_48dp.png";

interface ArtistTileProps {
  artist: SpotifyApi.ArtistObjectFull;
}

// const DEFAULT_AVATAR_URL = "images\\2x\\baseline_person_black_48dp.png";

export const ArtistTile: React.FC<ArtistTileProps> = ({ artist }) => {
  const srcSet = artist.images.length
    ? artist.images.map((image) => `${image.url} ${image.width}w`).join(", ")
    : DEFAULT_AVATAR_URL;

  return (
    <Button key={artist.id}>
      <ImageListItem>
        <img srcSet={srcSet} width={"100%"} alt={artist.name} loading="lazy" />
        <ImageListItemBar
          title={artist.name}
          subtitle={<span>{ToTitleCase(artist.type)}</span>}
          position={artist.images.length > 0 ? "bottom" : "below"}
          sx={{ color: "black" }}
          actionIcon={
            <IconButton color="primary">
              <AddIcon />
            </IconButton>
          }
          actionPosition="right"
        />
      </ImageListItem>
    </Button>
  );
};
