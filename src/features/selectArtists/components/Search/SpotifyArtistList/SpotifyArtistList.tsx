import Grid2 from '@mui/material/GridLegacy';
import React, { useMemo } from 'react';
import type { ArtistData } from '@state/selectedArtistsAtoms';
import type { ArtistSearchResponse } from '@shared/types/search';
import type { SearchArtist } from '@shared/types/artist';
import { ArtistTile } from './ArtistTile';

interface SpotifyArtistListProps {
  searchResults: ArtistSearchResponse;
  toggleArtist: (item: SearchArtist) => void;
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
