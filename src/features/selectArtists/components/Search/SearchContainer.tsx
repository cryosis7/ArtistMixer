import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { LoadingSpinner } from './LoadingSpinner';
import { SearchForm } from './SearchForm';
import { SpotifyArtistList } from './SpotifyArtistList/SpotifyArtistList';
import { selectedArtistsAtom } from '@state/selectedArtistsAtoms';

interface SearchContainerProps {
  toggleArtist: (artists: SpotifyApi.ArtistObjectFull) => void;
}

export const SearchContainer: React.FC<SearchContainerProps> = ({
  toggleArtist,
}) => {
  const [selectedArtists] = useAtom(selectedArtistsAtom);
  const [searchResults, setSearchResults] = useState<SpotifyApi.SearchResponse>({});
  const [isSearching, setIsSearching] = useState<boolean>(false);

  return (
    <>
      <SearchForm
        setSearchResults={setSearchResults}
        setIsSearching={setIsSearching}
      />
      {isSearching && <LoadingSpinner />}
      {!isSearching && searchResults.artists && (
        <SpotifyArtistList
          searchResults={searchResults}
          toggleArtist={toggleArtist}
          selectedArtists={selectedArtists}
        />
      )}
    </>
  );
};
