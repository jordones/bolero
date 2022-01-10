import * as React from 'react';
import { Screen } from '../Common/Screen';
import { FC, useEffect, useState } from 'react';
import { LogoutForm } from '../Auth/LoginForm';
import ProfileHeader from '../Profile/ProfileHeader';
import { useUsersService } from '../Service/ServiceProvider';
import { ActivityIndicator } from 'react-native';
import { CollectionsSection } from '../Profile/Collection/CollectionsSection';

export const ProfileScreen: FC = () => {
  const userService = useUsersService();
  const [collections, setCollections] = useState<any>([]);
  const [state, setState] = useState({
    fetching: false,
    loaded: false,
    errored: false,
  });

  useEffect(() => {
    const fetchUserCollections = async () => {
      setState({
        fetching: true,
        loaded: false,
        errored: false,
      });
      try {
        const loadedCollections = await userService.getUserSongCollections();
        setCollections(loadedCollections);
        setState({
          fetching: false,
          loaded: true,
          errored: false,
        });
      } catch (e) {
        setState({
          fetching: false,
          loaded: false,
          errored: true,
        });
      }
    };

    fetchUserCollections();
  }, [userService]);
  return (
    <Screen>
      <ProfileHeader />
      {state.errored && <ActivityIndicator size={'large'} />}
      {state.fetching && <ActivityIndicator size={'large'} />}
      {state.loaded && <CollectionsSection collections={collections} />}
      <LogoutForm />
    </Screen>
  );
};
