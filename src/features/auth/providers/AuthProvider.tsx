import React, { useEffect, useState, type ReactNode } from 'react';
import { exchangeRefreshToken, getToken } from '@features/auth/services/spotifyAuth';
import { AuthContext } from './AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  // Initialize auth on mount
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code') ?? '';
    const refreshToken = localStorage.getItem('refreshToken');

    if (!isAuthenticating && !isAuthenticated && !error) {
      if (code !== '') {
        setIsAuthenticating(true);

        try {
          const cleanedURL = window.location.href.split('?')[0];
          window.history.replaceState({}, document.title, cleanedURL);
          getToken(code)
            .then((value) => {
              setIsAuthenticated(true);
              setToken(value);
            })
            .catch((reason) => {
              console.error(reason);
              setIsAuthenticated(false);
              setError(true);
            })
            .finally(() => {
              setIsAuthenticating(false);
            });
        } catch {
          console.error('Error while exchanging fetching token');
          setIsAuthenticating(false);
          setError(true);
        }
      } else if (refreshToken !== null && refreshToken !== '' && token === '') {
        setIsAuthenticating(true);

        try {
          exchangeRefreshToken(refreshToken)
            .then((newToken) => {
              setIsAuthenticated(true);
              setToken(newToken);
            })
            .catch((reason) => {
              console.error(reason);
              setIsAuthenticated(false);
              setError(true);
            })
            .finally(() => setIsAuthenticating(false));
        } catch {
          console.error('Error while exchanging refresh token');
          setIsAuthenticating(false);
          setError(true);
        }
      }
    }
  }, [isAuthenticated, isAuthenticating, token, error]);

  const login = (code: string) => {
    if (code) {
      setIsAuthenticating(true);
      getToken(code)
        .then((value) => {
          setIsAuthenticated(true);
          setToken(value);
        })
        .catch((reason) => {
          console.error(reason);
          setError(true);
        })
        .finally(() => {
          setIsAuthenticating(false);
        });
    }
  };

  const refresh = (refreshToken: string) => {
    setIsAuthenticating(true);
    exchangeRefreshToken(refreshToken)
      .then((newToken) => {
        setIsAuthenticated(true);
        setToken(newToken);
      })
      .catch((reason) => {
        console.error(reason);
        setError(true);
      })
      .finally(() => setIsAuthenticating(false));
  };

  const logout = () => {
    setToken('');
    setIsAuthenticated(false);
    localStorage.removeItem('refreshToken');
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        isAuthenticating,
        error,
        login,
        refresh,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
