import React, { useState } from 'react';
import { GeneratePlaylistControl } from './GeneratePlaylistControl';
import { SelectedArtists } from '../SelectArtists/SelectArtists';
import { PlaylistContract } from '../../models/datacontracts/PlaylistContract';
import { LoadingSpinner } from '../SelectArtists/Search/LoadingSpinner';

interface GenerateProps {
  selectedArtists: SelectedArtists;
  setPlaylist: React.Dispatch<React.SetStateAction<PlaylistContract>>;
  token: string;
}

export const Generate = ({ setPlaylist, token, selectedArtists }: GenerateProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <GeneratePlaylistControl
          selectedArtists={selectedArtists}
          setPlaylist={setPlaylist}
          token={token}
          isLoading={() => isLoading}
          setIsLoading={setIsLoading}
        />
      )}
      ;
    </>
  );
};
