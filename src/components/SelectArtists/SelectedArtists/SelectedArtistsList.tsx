import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { SelectedArtists } from '../SelectArtists'
import ListItemText from '@mui/material/ListItemText'
import React, { useState } from 'react'
import ListItemButton from '@mui/material/ListItemButton'

interface SelectedArtistsListProps {
  selectedArtists: SelectedArtists
  removeArtist: (artistId: string) => void
}

export const SelectedArtistsList: React.FC<SelectedArtistsListProps> = ({
  selectedArtists,
  removeArtist,
}) => {
  const [selectedItem, setSelectedItem] = useState<string>('')

  if (selectedArtists.length) {
    return <></>
  }

  const handleRemove = (id: string) => {
    removeArtist(id)
    setSelectedItem('')
  }

  return (
    <List>
      {Object.entries(selectedArtists).map(([id, artist]) => {
        const isSelected = selectedItem === id

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
                    event.stopPropagation()
                    handleRemove(id)
                  }}
                >
                  <RemoveCircleOutlineOutlinedIcon color={isSelected ? 'error' : 'action'} />
                </IconButton>
              }
            >
              <ListItemText primary={artist.name} />
            </ListItem>
          </ListItemButton>
        )
      })}
    </List>
  )
}
