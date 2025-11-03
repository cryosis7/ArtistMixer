import { createContext } from 'react';

export interface AuthContextType {
  token: string;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  error: boolean;
  login: (code: string) => void;
  refresh: (refreshToken: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

