import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { SxProps } from "@mui/material/styles";
import { useState } from "react";

interface ArtistTileProps {
  artist: SpotifyApi.ArtistObjectFull;
  addArtist: (artist: SpotifyApi.ArtistObjectFull) => void;
  selected: boolean;
}

export const ArtistTile: React.FC<ArtistTileProps> = ({
  artist,
  addArtist,
  selected,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const hasImages = artist.images.length > 0;
  const srcSet = artist.images
    ?.map((image) => `${image.url} ${image.width}w`)
    .join(", ");

  const image = hasImages ? (
    <img srcSet={srcSet} width={"100%"} alt={artist.name} loading="lazy" />
  ) : (
    <PersonIcon
      sx={{
        color: "common.black",
        fontSize: "3rem",
        width: "100%",
      }}
    />
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const selectedStyling: SxProps = selected
    ? {
        border: "2px solid",
        borderColor: "primary.light",
        padding: 2,
      }
    : {};

  return (
    <Button
      onClick={() => addArtist(artist)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      fullWidth
      sx={{
        height: "100%",
        ...selectedStyling,
      }}
    >
      <ImageListItem sx={{ width: "100%", height: "100%" }}>
        {image}
        <ImageListItemBar
          title={artist.name}
          position={artist.images.length > 0 ? "bottom" : "below"}
          sx={{ color: "black" }}
        />
        {isHovered && (
          <Box
            className={`centerContent`}
            sx={hasImages ? { backgroundColor: "action.active" } : {}}
          >
            <AddIcon fontSize="large" color="inherit" />
          </Box>
        )}
      </ImageListItem>
    </Button>
  );
};
