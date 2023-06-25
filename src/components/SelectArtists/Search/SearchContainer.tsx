import { useState } from "react";
import { SpotifyMedia } from "../SelectArtists";
import { SpotifyMediaList } from "./SpotifyMediaList/SpotifyMediaList";
import { LoadingSpinner } from "./LoadingSpinner";
import { SearchForm } from "./SearchForm";

interface SearchContainerProps {
  addSelectedMedia: (media: SpotifyMedia) => void;
}

export const SearchContainer: React.FC<SearchContainerProps> = ({
  addSelectedMedia,
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
        <SpotifyMediaList media={searchResults} addItem={addSelectedMedia} />
      )}
    </>
  );
};
