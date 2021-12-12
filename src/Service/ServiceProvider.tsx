import React, { useMemo } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import PostService from './Posts/service';

interface ContextProps {
  postService: ReturnType<typeof PostService> | null;
}

export const ServiceContext = React.createContext<ContextProps>({
  postService: null,
});

export const ServiceProvider: React.FC = ({ children }) => {
  const auth = getAuth();
  const db = getFirestore();
  const postService = useMemo(() => PostService(db, auth), [db, auth]);
  return (
    <ServiceContext.Provider value={{ postService }}>
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

export const usePostService = () => useService().postService;
