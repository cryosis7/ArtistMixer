import { useEffect, useRef, useState } from 'react';
import { LoadingSpinner } from './SelectArtists/Search/LoadingSpinner';
import SpotifyAuth from './SpotifyAuth';

interface LoginProps {
  code: string;
  hasRequestedToken: boolean;
}

export const Login: React.FC<LoginProps> = ({ code }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const hasRequestedToken = useRef<boolean>(false);

  console.log('login code: ', code);

  useEffect(() => {
    if (!hasRequestedToken.current && code !== '') {
      console.log('prop code: ', code);
      hasRequestedToken.current = true;
      setIsLoading(true);

      const url = 'https://jrfg22ir6f.execute-api.ap-southeast-2.amazonaws.com/api/authenticate';
      fetch(`${url}?code=${code}`)
        .then((res) => res.json())
        .then((data) => {
          sessionStorage.setItem('token', data.token);
          sessionStorage.removeItem('code');
        })
        .catch((err) => console.log(JSON.stringify(err)))
        .finally(() => setIsLoading(false));
    }
  }, [code]);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <SpotifyAuth
      clientId={process.env.REACT_APP_SPOTIFY_CLIENT_ID ?? ''}
      scopes={[
        'user-read-email',
        'user-read-private',
        'playlist-modify-public',
        'playlist-modify-private',
      ]}
    />
  );
};
