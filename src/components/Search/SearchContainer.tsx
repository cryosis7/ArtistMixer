import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { SearchForm } from "./SearchForm";
import { SpotifyMediaList } from "../SpotifyMediaList/SpotifyMediaList";

interface SearchContainerProps {}

export type SpotifyMedia =
  | SpotifyApi.TrackObjectFull
  | SpotifyApi.ArtistObjectFull
  | SpotifyApi.AlbumObjectFull;

interface MediaItem {
  [id: string]: {
    name: string;
  };
}
interface SourceMedia {
  artist?: MediaItem;
  track?: MediaItem;
  album?: MediaItem;
}

export const SearchContainer: React.FC<SearchContainerProps> = () => {
  const [searchResults, setSearchResults] = useState<SpotifyApi.SearchResponse>(
    {}
  );
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [sourceMedia, setSourceMedia] = useState<SourceMedia>({});

  useEffect(() => {
    console.log(sourceMedia);
  }, [sourceMedia]);

  const addSourceMedia = (media: SpotifyMedia) => {
    setSourceMedia({
      ...sourceMedia,
      [media.type]: {
        ...sourceMedia[media.type],
        [media.id]: { name: media.name },
      },
    });
  };

  return (
    <>
      <SearchForm
        setSearchResults={setSearchResults}
        setIsSearching={setIsSearching}
      />
      {isSearching && <CircularProgress size={"10rem"} />}
      {!isSearching && searchResults && (
        <SpotifyMediaList media={searchResults} addItem={addSourceMedia} />
      )}
    </>
  );
};
