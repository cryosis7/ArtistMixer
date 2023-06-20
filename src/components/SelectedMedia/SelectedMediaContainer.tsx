import Button from "@mui/material/Button";
import { SelectedMediaList } from "./SelectedMediaList";
import React from "react";
import { redirect } from "react-router-dom";

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
  const token = localStorage.getItem("token") ?? "";

  if (!token) {
    console.error("No token found - Auth test must be failing");
  }

  const generatePlaylist = () => {
    const url =
      "https://jrfg22ir6f.execute-api.ap-southeast-2.amazonaws.com/api/getrandomplaylist";
    const params = new URLSearchParams();
    params.set("token", token);
    params.set("artists", Object.keys(selectedMedia?.artist ?? "").join(","));
    params.set("playlistSize", "30");
    const requestUrl = `${url}?${params.toString()}`;

    fetch(requestUrl, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // setSearchResults(data);
        // TODO: get the random songs from the api.
      })
      .catch((err) => {
        // If unauthorized, redirect to login
        if (err.status === 401) {
          redirect("/login");
        } else {
          console.error(err);
        }
      })
      .finally(() => {
        // setIsSearching(false);
      });
  };

  return (
    <React.Fragment>
      <SelectedMediaList selectedMedia={selectedMedia} />
      <Button variant="contained" color="primary" onClick={generatePlaylist}>
        Generate Playlist
      </Button>
    </React.Fragment>
  );
};
