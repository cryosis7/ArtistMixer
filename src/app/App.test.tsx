import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import App from './App';
import { AuthProvider } from './providers/AuthProvider';

test('renders App without crashing', () => {
  const { container } = render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
  expect(container.firstChild).toBeTruthy();
});
