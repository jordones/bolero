import * as React from 'react';
import { Screen } from '../Common/Screen';
import { FC } from 'react';
import { LogoutForm } from '../Auth/LoginForm';
import ProfileHeader from '../Profile/ProfileHeader';

export const ProfileScreen: FC = () => {
  return (
    <Screen>
      <ProfileHeader />
      <LogoutForm />
    </Screen>
  );
};
