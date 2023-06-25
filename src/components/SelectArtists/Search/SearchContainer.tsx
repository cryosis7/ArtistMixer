import { useState } from "react";
import { SelectedMedia } from "../SelectArtists";
import { LoadingSpinner } from "./LoadingSpinner";
import { SearchForm } from "./SearchForm";
import { SpotifyMediaList } from "./SpotifyMediaList/SpotifyMediaList";

interface SearchContainerProps {
  toggleArtist: (media: SpotifyApi.ArtistObjectFull) => void;
  selectedMedia: SelectedMedia;
}

export const SearchContainer: React.FC<SearchContainerProps> = ({
  toggleArtist,
  selectedMedia,
}) => {
  const [searchResults, setSearchResults] = useState<SpotifyApi.SearchResponse>(
    {}
  );
  const [isSearching, setIsSearching] = useState<boolean>(false);

  return (
    <>
      <SearchForm
        setSearchResults={setSearchResults}
        setIsSearching={setIsSearching}
      />
      {isSearching && <LoadingSpinner />}
      {!isSearching && searchResults.artists && (
        <SpotifyMediaList
          media={searchResults}
          toggleArtist={toggleArtist}
          selectedMedia={selectedMedia}
        />
      )}
    </>
  );
};
