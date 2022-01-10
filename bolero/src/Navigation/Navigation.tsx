import { NavigationContainer } from '@react-navigation/native';
import React, { FC } from 'react';
import { Tabs } from './Tabs';

const Navigation: FC = ({ children }) => (
  <NavigationContainer>
    {children}
    <Tabs />
  </NavigationContainer>
);

export default Navigation;
