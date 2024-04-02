import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import React, { useMemo } from 'react'
import { SelectedArtists } from '../../SelectArtists'
import { ArtistTile } from './ArtistTile'

interface SpotifyArtistListProps {
  searchResults: SpotifyApi.SearchResponse
  toggleArtist: (item: SpotifyApi.ArtistObjectFull) => void
  selectedArtists: SelectedArtists
}

export const SpotifyArtistList: React.FC<SpotifyArtistListProps> = ({
  searchResults,
  toggleArtist,
  selectedArtists,
}) => {
  const artistIds = useMemo(() => Object.keys(selectedArtists), [selectedArtists])

  if (searchResults.artists) {
    return (
      <Grid2 container spacing={0.5} columns={{ xs: 1, sm: 3, lg: 4 }}>
        {searchResults.artists.items.map((artist) => (
          <Grid2 key={artist.id} xs={1}>
            <ArtistTile
              artist={artist}
              toggleArtist={toggleArtist}
              selected={artistIds.includes(artist.id)}
            />
          </Grid2>
        ))}
      </Grid2>
    )
  }
  return (
    <>
      <p>media.artists is undefined</p>
    </>
  )
}
