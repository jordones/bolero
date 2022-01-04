import { useState, useEffect, useCallback } from 'react';
import { NativeModules } from 'react-native';
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import { getApp } from '@firebase/app';
const { SharedStorage } = NativeModules;

export interface setAuthProps {
  token: string;
  id: string;
}

const useAuth = () => {
  const app = getApp();
  const auth = getAuth(app);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [state, setState] = useState({
    loggedIn: false,
    loaded: false,
  });

  const setStoredAuth = useCallback(
    ({ token, id }: setAuthProps = { token: '', id: '' }) => {
      SharedStorage.setString('access_token', token);
      SharedStorage.setString('user_id', id);
    },
    [],
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (!user) {
        setState({
          loggedIn: false,
          loaded: true,
        });
        setStoredAuth();
        setUserId(undefined);
      } else {
        console.log('user', user);
        setState({
          loggedIn: true,
          loaded: true,
        });
        setUserId(user.uid);
        user.getIdToken().then(token => {
          setStoredAuth({ token, id: user.uid });
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth, setStoredAuth]);

  return {
    userId,
    signOut: () => signOut(auth),
    isAuthenticated: state.loggedIn,
    isLoaded: state.loaded,
  };
};

export default useAuth;
