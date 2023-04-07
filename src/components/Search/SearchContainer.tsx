import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { SearchForm } from "./SearchForm";
import { SpotifyMediaList } from "../SpotifyMediaList/SpotifyMediaList";

interface SearchContainerProps {}

export const SearchContainer: React.FC<SearchContainerProps> = () => {
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
      {isSearching && <CircularProgress size={"10rem"} />}
      {!isSearching && searchResults && (
        <SpotifyMediaList media={searchResults} />
      )}
    </>
  );
};
