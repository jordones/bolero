import * as React from 'react';
import { Text } from 'react-native';
import { Screen } from '../Common/Screen';
import { FC } from 'react';
import { LogoutForm } from '../Auth/LoginForm';
import ProfileHeader from '../Profile/ProfileHeader';

export const ProfileScreen: FC = () => {
  return (
    <Screen>
      <ProfileHeader />
      <Text>Profile Screen</Text>
      <LogoutForm />
    </Screen>
  );
};
