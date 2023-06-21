import { PlaylistContract } from "../../models/datacontracts/PlaylistContract";
import React from "react";

interface DraftPlaylistProps {
  playlist: PlaylistContract;
}

export const DraftPlaylist: React.FC<DraftPlaylistProps> = ({ playlist }) => {
  return (
    <ul>
      {playlist.songs?.map((song) => {
        return (
          <li>
            {song.name} -{" "}
            {song.artists?.map((artist) => artist.name).join(", ")}
          </li>
        );
      })}
    </ul>
  );
};
