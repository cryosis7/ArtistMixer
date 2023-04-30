import { SelectedMediaList } from "./SelectedMediaList";

export type SpotifyMedia =
  | SpotifyApi.TrackObjectFull
  | SpotifyApi.ArtistObjectFull
  | SpotifyApi.AlbumObjectFull;

export interface MediaItem {
  [id: string]: {
    name: string;
  };
}
export interface SelectedMedia {
  artist?: MediaItem;
  track?: MediaItem;
  album?: MediaItem;
}

interface SelectedMediaContainerProps {
  selectedMedia: SelectedMedia;
}

export const SelectedMediaContainer: React.FC<SelectedMediaContainerProps> = ({
  selectedMedia,
}) => {
  return <SelectedMediaList selectedMedia={selectedMedia} />;
};
