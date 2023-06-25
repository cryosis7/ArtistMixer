import { useState } from "react";
import { SelectedMedia, SpotifyMedia } from "../SelectArtists";
import { SpotifyMediaList } from "./SpotifyMediaList/SpotifyMediaList";
import { LoadingSpinner } from "./LoadingSpinner";
import { SearchForm } from "./SearchForm";

interface SearchContainerProps {
  addSelectedMedia: (media: SpotifyMedia) => void;
  selectedMedia: SelectedMedia;
}

export const SearchContainer: React.FC<SearchContainerProps> = ({
  addSelectedMedia,
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
          addItem={addSelectedMedia}
          selectedMedia={selectedMedia}
        />
      )}
    </>
  );
};
