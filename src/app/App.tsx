import React from 'react';
import './App.css';
import { useAtom } from 'jotai';
import { NavigationBar } from '@shared/components/NavigationBar';
import { steps } from '@shared/constants/steps';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { getCode } from '@features/auth/services/spotifyAuth';
import { LoadingSpinner } from '@features/selectArtists/components/Search/LoadingSpinner';
import { SelectArtists } from '@features/selectArtists/components/SelectArtists';
import { RefinePlaylist } from '@features/refinePlaylist/components/RefinePlaylist';
import { Generate } from '@features/generatePlaylist/components/Generate';
import { useAuth } from '@features/auth/hooks/useAuth';
import { draftPlaylistAtom } from '@state/playlistAtoms';
import { useState, useEffect } from 'react';
import { AuthProvider } from '@features/auth/providers/AuthProvider';

const AppContent: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const { isAuthenticated, isAuthenticating } = useAuth();
  const [playlist] = useAtom(draftPlaylistAtom);

  useEffect(() => {
    if (playlist.songs.length > 0) {
      setActiveStep(steps.indexOf('REFINE'));
    } else {
      setActiveStep(steps.indexOf('SELECT ARTISTS'));
    }
  }, [playlist]);

  const getCurrentScreen = () => {
    if (steps[activeStep] === 'SELECT ARTISTS') {
      return <SelectArtists />;
    } else if (steps[activeStep] === 'GENERATE') {
      return <Generate />;
    } else if (steps[activeStep] === 'REFINE') {
      return <RefinePlaylist setActiveStep={setActiveStep} />;
    }
    return <></>;
  };

  return (
    <>
      <NavigationBar activeStep={activeStep} setActiveStep={setActiveStep} />

      {isAuthenticated ? (
        getCurrentScreen()
      ) : isAuthenticating ? (
        <LoadingSpinner />
      ) : (
        <Box textAlign="center" padding={6}>
          <Button variant="contained" role="link" onClick={getCode}>
            Authorize Spotify
          </Button>
        </Box>
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
