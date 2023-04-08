import { SourceMediaList } from "./SourceMediaList";

export type SpotifyMedia =
  | SpotifyApi.TrackObjectFull
  | SpotifyApi.ArtistObjectFull
  | SpotifyApi.AlbumObjectFull;

export interface MediaItem {
  [id: string]: {
    name: string;
  };
}
export interface SourceMedia {
  artist?: MediaItem;
  track?: MediaItem;
  album?: MediaItem;
}

interface SourceMediaContainerProps {
  sourceMedia: SourceMedia;
}

export const SourceMediaContainer: React.FC<SourceMediaContainerProps> = ({
  sourceMedia,
}) => {
  return <SourceMediaList sourceMedia={sourceMedia} />;
};
