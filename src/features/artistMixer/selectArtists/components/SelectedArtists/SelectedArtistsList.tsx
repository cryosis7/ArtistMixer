import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React, { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import { useAtom } from 'jotai';
import { selectedArtistsAtom } from '@state/selectedArtistsAtoms';

interface SelectedArtistsListProps {
  removeArtist: (artistId: string) => void;
}

export const SelectedArtistsList: React.FC<SelectedArtistsListProps> = ({
  removeArtist,
}) => {
  const [selectedArtists] = useAtom(selectedArtistsAtom);
  const [selectedItem, setSelectedItem] = useState<string>('');

  if (!selectedArtists.length) {
    return <></>;
  }

  const handleRemove = (id: string) => {
    removeArtist(id);
    setSelectedItem('');
  };

  return (
    <List>
      {selectedArtists.map(({ id, name }) => {
        const isSelected = selectedItem === id;

        return (
          <ListItemButton
            selected={isSelected}
            onClick={() => setSelectedItem(id === selectedItem ? '' : id)}
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
                  <RemoveCircleOutlineOutlinedIcon color={isSelected ? 'error' : 'action'} />
                </IconButton>
              }
            >
              <ListItemText primary={name} />
            </ListItem>
          </ListItemButton>
        );
      })}
    </List>
  );
};
