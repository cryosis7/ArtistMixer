import Grid2 from '@mui/material/GridLegacy';
import React, { useMemo } from 'react';
import type { ArtistData } from '@state/selectedArtistsAtoms';
import { ArtistTile } from './ArtistTile';

interface SpotifyArtistListProps {
  searchResults: SpotifyApi.SearchResponse;
  toggleArtist: (item: SpotifyApi.ArtistObjectFull) => void;
  selectedArtists: ArtistData[];
}

export const SpotifyArtistList: React.FC<SpotifyArtistListProps> = ({
  searchResults,
  toggleArtist,
  selectedArtists,
}) => {
  const artistIds = useMemo(() => new Set(selectedArtists.map((a) => a.id)), [selectedArtists]);

  if (searchResults.artists) {
    return (
      <Grid2 container spacing={0.5} columns={{ xs: 1, sm: 3, lg: 4 }}>
        {searchResults.artists.items.map((artist) => (
          <Grid2 key={artist.id} xs={1}>
            <ArtistTile
              artist={artist}
              toggleArtist={toggleArtist}
              selected={artistIds.has(artist.id)}
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
