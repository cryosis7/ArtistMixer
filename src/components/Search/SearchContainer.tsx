import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { SpotifyMedia } from "../SelectedMedia/SelectedMediaContainer";
import { SpotifyMediaList } from "../SpotifyMediaList/SpotifyMediaList";
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
      {isSearching && <CircularProgress size={"10rem"} />}
      {!isSearching && searchResults && (
        <SpotifyMediaList media={searchResults} addItem={addSelectedMedia} />
      )}
    </>
  );
};
