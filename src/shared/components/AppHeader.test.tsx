import { render, screen } from '@testing-library/react';
import { AppHeader } from './AppHeader';

test('renders AppHeader with mode toggle', () => {
  render(<AppHeader />);
  
  expect(screen.getByText('ArtistMixer')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Mixer/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Ranker/i })).toBeInTheDocument();
});

