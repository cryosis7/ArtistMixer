import { SelectedMediaList } from "./SelectedMediaList";
import React from "react";
import { SelectedMedia } from "../SelectArtists";
import { TempGeneratePlaylist } from "../../GeneratePlaylist/TempGeneratePlaylist";

interface SelectedMediaContainerProps {
  selectedMedia: SelectedMedia;
}

export const SelectedMediaContainer: React.FC<SelectedMediaContainerProps> = ({
  selectedMedia,
}) => {
  return (
    <>
      <SelectedMediaList selectedMedia={selectedMedia} />
      <TempGeneratePlaylist selectedArtists={selectedMedia} />
    </>
  );
};
