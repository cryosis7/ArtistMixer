import React, { useState } from 'react'
import { SelectedArtists } from '../SelectArtists'
import { LoadingSpinner } from './LoadingSpinner'
import { SearchForm } from './SearchForm'
import { SpotifyArtistList } from './SpotifyArtistList/SpotifyArtistList'

interface SearchContainerProps {
  toggleArtist: (artists: SpotifyApi.ArtistObjectFull) => void
  selectedArtists: SelectedArtists
  token: string
}

export const SearchContainer: React.FC<SearchContainerProps> = ({
  toggleArtist,
  selectedArtists,
  token,
}) => {
  const [searchResults, setSearchResults] = useState<SpotifyApi.SearchResponse>({})
  const [isSearching, setIsSearching] = useState<boolean>(false)

  return (
    <>
      <SearchForm
        setSearchResults={setSearchResults}
        setIsSearching={setIsSearching}
        token={token}
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
  )
}
