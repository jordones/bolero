import React, { useMemo } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import PostService from './Posts/service';
import FollowService from './Following/service';
import UsersService from './Users/service';

interface ContextProps {
  postService: ReturnType<typeof PostService> | null;
  followService: ReturnType<typeof FollowService> | null;
  usersService: ReturnType<typeof UsersService> | null;
}

export const ServiceContext = React.createContext<ContextProps>({
  postService: null,
  followService: null,
  usersService: null,
});

export const ServiceProvider: React.FC = ({ children }) => {
  const auth = getAuth();
  const db = getFirestore();
  const postService = useMemo(() => PostService(db, auth), [db, auth]);
  const followService = useMemo(() => FollowService(db, auth), [db, auth]);
  const usersService = useMemo(() => UsersService(db, auth), [db, auth]);

  return (
    <ServiceContext.Provider
      value={{ postService, followService, usersService }}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = () => {
  const context = React.useContext(ServiceContext);
  if (context === undefined) {
    throw new Error('useService must be used within a ServiceProvider');
  }
  return context;
};

export const usePostService = () => useService().postService!;
export const useFollowService = () => useService().followService!;
export const useUsersService = () => useService().usersService!;
