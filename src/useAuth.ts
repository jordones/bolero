import { useState, useEffect } from 'react';
import { NativeModules } from 'react-native';
const { SharedStorage } = NativeModules;

export interface setAuthProps {
  token: string;
  id: string;
}

const noOp = () => {};

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | undefined>(undefined);

  const getAuth = () => {
    SharedStorage.getString('access_token', noOp, noOp);
    SharedStorage.getString('user_id', setUserId, noOp);
  };

  const setAuth = ({ token, id }: setAuthProps = { token: '', id: '' }) => {
    SharedStorage.setString('access_token', token);
    SharedStorage.setString('user_id', id);
    getAuth();
  };

  // On mount fetch currently stored credentials
  useEffect(() => {
    getAuth();
  }, []);

  // Update isAuthenticated based on whether or not we have a userId
  useEffect(() => {
    setIsAuthenticated(!!userId);
  }, [userId]);

  return {
    isAuthenticated,
    userId,
    setAuth,
  };
};

export default useAuth;
