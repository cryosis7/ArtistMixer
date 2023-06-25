import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { SelectedMedia } from "../SelectArtists";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";

interface SelectedMediaListProps {
  selectedMedia: SelectedMedia;
  removeArtist: (artistId: string) => void;
}

export const SelectedMediaList: React.FC<SelectedMediaListProps> = ({
  selectedMedia,
  removeArtist,
}) => {
  const [selectedItem, setSelectedItem] = useState<string>("");

  if (selectedMedia.artist?.length) {
    return <></>;
  }

  const handleRemove = (id: string) => {
    removeArtist(id);
    setSelectedItem("");
  };

  return (
    <List>
      {Object.entries(selectedMedia.artist ?? []).map(([id, artist]) => {
        const isSelected = selectedItem === id;

        return (
          <ListItemButton
            selected={isSelected}
            onClick={() => setSelectedItem(id === selectedItem ? "" : id)}
            divider
            key={id}
          >
            <ListItem
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="remove"
                  size="small"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleRemove(id);
                  }}
                >
                  <RemoveCircleOutlineOutlinedIcon
                    color={isSelected ? "error" : "action"}
                  />
                </IconButton>
              }
            >
              <ListItemText primary={artist.name} />
            </ListItem>
          </ListItemButton>
        );
      })}
    </List>
  );
};
