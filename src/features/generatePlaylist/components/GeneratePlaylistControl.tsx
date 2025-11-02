import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import React, { useState } from 'react';
import { useAtom } from 'jotai';
import type { PlaylistContract, Song } from '@shared/types/playlist';
import { selectedArtistsAtom } from '@state/selectedArtistsAtoms';
import { draftPlaylistAtom } from '@state/playlistAtoms';
import { useAuth } from '@features/auth/hooks/useAuth';

interface GeneratePlaylistControlProps {
  isLoading: () => boolean;
  setIsLoading: React.Dispatch<boolean>;
}

export const GeneratePlaylistControl: React.FC<GeneratePlaylistControlProps> = ({
  isLoading,
  setIsLoading,
}) => {
  const [selectedArtists] = useAtom(selectedArtistsAtom);
  const [, setPlaylist] = useAtom(draftPlaylistAtom);
  const { token } = useAuth();
  const [playlistSize, setPlaylistSize] = useState<number>(30);

  const url = 'https://jrfg22ir6f.execute-api.ap-southeast-2.amazonaws.com/api/getrandomplaylist';
  const params = new URLSearchParams();
  params.set('token', token);
  params.set('artists', selectedArtists.map((a) => a.id).join(','));
  params.set('playlistSize', playlistSize.toString());
  const requestUrl = `${url}?${params.toString()}`;

  const generatePlaylist = async () => {
    setIsLoading(true);

    fetch(requestUrl, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const newPlaylist: PlaylistContract = Object.assign({}, data);

        // Mapping the Song array
        if (data.songs) {
          newPlaylist.songs = data.songs.map((songData: Song) => {
            const song: Song = Object.assign({}, songData);

            // Mapping the Artist array inside each Song
            if (song.artists) {
              song.artists = song.artists.map((artistData) => Object.assign({}, artistData));
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

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setPlaylistSize(Number.parseInt(value));
    }
  };

  return (
    <>
      <Input
        type="number"
        value={playlistSize.toString()}
        onChange={handleChange}
        disabled={isLoading()}
        placeholder="Playlist Size"
        sx={{ marginX: 1 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={generatePlaylist}
        disabled={isLoading()}
        sx={{ marginX: 1 }}
      >
        Generate Playlist
      </Button>
    </>
  );
};
