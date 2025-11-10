import React from 'react';
import './App.css';
import { useAtom } from 'jotai';
import { AppHeader } from '@shared/components/AppHeader';
import { appModeAtom } from '@state/appModeAtom';
import { ArtistMixer } from '@features/artistMixer';
import { Ranker } from '@features/ranker';
import { AuthProvider } from '@features/auth/providers/AuthProvider';

const AppContent: React.FC = () => {
  const [mode] = useAtom(appModeAtom);

  return (
    <>
      <AppHeader />
      {mode === 'mixer' ? <ArtistMixer /> : <Ranker />}
    </>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};