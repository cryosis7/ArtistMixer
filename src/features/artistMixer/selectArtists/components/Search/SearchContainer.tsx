import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { LoadingSpinner } from './LoadingSpinner';
import { SearchForm } from './SearchForm';
import { SpotifyArtistList } from './SpotifyArtistList/SpotifyArtistList';
import { selectedArtistsAtom } from '@state/selectedArtistsAtoms';
import type { ArtistSearchResponse } from '@shared/types/search';
import type { SearchArtist } from '@shared/types/artist';

interface SearchContainerProps {
  toggleArtist: (artists: SearchArtist) => void;
}

export const SearchContainer: React.FC<SearchContainerProps> = ({
  toggleArtist,
}) => {
  const [selectedArtists] = useAtom(selectedArtistsAtom);
  const [searchResults, setSearchResults] = useState<ArtistSearchResponse | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  return (
    <>
      <SearchForm
        setSearchResults={setSearchResults}
        setIsSearching={setIsSearching}
      />
      {isSearching && <LoadingSpinner />}
      {!isSearching && searchResults?.artists && (
        <SpotifyArtistList
          searchResults={searchResults}
          toggleArtist={toggleArtist}
          selectedArtists={selectedArtists}
        />
      )}
    </>
  );
};
