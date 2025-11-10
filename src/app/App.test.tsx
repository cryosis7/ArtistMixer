import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '@features/auth/providers/AuthProvider';
import { PlaylistMixerPage } from '@pages/index';

test('renders App without crashing', () => {
  const { container } = render(
    <AuthProvider>
      <MemoryRouter>
        <PlaylistMixerPage />
      </MemoryRouter>
    </AuthProvider>
  );
  expect(container.firstChild).toBeTruthy();
});
