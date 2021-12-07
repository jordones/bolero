import React from 'react';
import useAuth, { setAuthProps } from './useAuth';

interface ContextProps {
  isAuthenticated: boolean;
  userId: string | undefined;
  setAuth: (props?: setAuthProps) => void;
}

export const AuthContext = React.createContext<ContextProps>({
  isAuthenticated: false,
  userId: undefined,
  setAuth: () => {},
});

export const AuthProvider: React.FC = ({ children }) => {
  const state = useAuth();
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export const useAuthState = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within an AuthProvider');
  }

  return context;
};
