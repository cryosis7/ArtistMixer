import React from 'react';
import './App.css';
import {HashRouter, Routes, Route} from 'react-router-dom';
import {AuthProvider} from '@features/auth/providers/AuthProvider';
import {PlaylistMixerPage, OtherSpotifyPage} from '@pages/index';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<PlaylistMixerPage />} />
          <Route path="/other" element={<OtherSpotifyPage />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};