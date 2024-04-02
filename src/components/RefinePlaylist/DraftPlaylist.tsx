import List from '@mui/material/List';
import { PlaylistContract } from '../../models/datacontracts/PlaylistContract';
import React, { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

interface DraftPlaylistProps {
  playlist: PlaylistContract;
  setPlaylist: React.Dispatch<PlaylistContract>;
}

export const DraftPlaylist: React.FC<DraftPlaylistProps> = ({ playlist, setPlaylist }) => {
  const [selectedItem, setSelectedItem] = useState<string>('');

  const handleRemove = (id: string) => {
    const updatedSongs = playlist.songs.filter((song) => song.id !== id);

    setPlaylist({
      version: playlist.version,
      songs: updatedSongs,
    });
  };

  return (
    <List>
      {playlist.songs.map((song) => {
        const isSelected = selectedItem === song.id;

        return (
          <ListItemButton
            selected={isSelected}
            onClick={() => setSelectedItem(song.id === selectedItem ? '' : song.id)}
            divider
            key={song.id}
          >
            <ListItem
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="remove"
                  size="small"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleRemove(song.id);
                  }}
                >
                  <RemoveCircleOutlineOutlinedIcon color={isSelected ? 'error' : 'action'} />
                </IconButton>
              }
            >
              <ListItemText
                primary={song.name}
                secondary={song.artists.map((artist) => artist.name).join(', ')}
              />
            </ListItem>
          </ListItemButton>
        );
      })}
    </List>
  );
};
