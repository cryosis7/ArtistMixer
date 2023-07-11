import {
  PlaylistContract,
  Song,
} from "../../models/datacontracts/PlaylistContract";
import { SelectedMedia } from "./SelectArtists";
import Button from "@mui/material/Button";

interface GeneratePlaylistButtonProps {
  selectedArtists: SelectedMedia;
  setPlaylist: React.Dispatch<PlaylistContract>;
  token: string;
  isLoading: () => boolean;
  setIsLoading: React.Dispatch<boolean>;
}

export const GeneratePlaylistButton: React.FC<GeneratePlaylistButtonProps> = ({
  selectedArtists,
  setPlaylist,
  token,
  isLoading,
  setIsLoading,
}) => {
  const url =
    "https://jrfg22ir6f.execute-api.ap-southeast-2.amazonaws.com/api/getrandomplaylist";
  const params = new URLSearchParams();
  params.set("token", token);
  params.set("artists", Object.keys(selectedArtists?.artist ?? "").join(","));
  params.set("playlistSize", "30");
  const requestUrl = `${url}?${params.toString()}`;

  const generatePlaylist = async () => {
    setIsLoading(true);

    fetch(requestUrl, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const newPlaylist: PlaylistContract = Object.assign({}, data);

        // Mapping the Song array
        if (data.songs) {
          newPlaylist.songs = data.songs.map((songData: any) => {
            const song: Song = Object.assign({}, songData);

            // Mapping the Artist array inside each Song
            if (song.artists) {
              song.artists = song.artists.map((artistData: any) =>
                Object.assign({}, artistData),
              );
            }

            return song;
          });
        }

        newPlaylist.songs.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          } else {
            return 0;
          }
        });
        setPlaylist(newPlaylist);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={generatePlaylist}
      disabled={isLoading()}
    >
      Generate Playlist
    </Button>
  );
};
