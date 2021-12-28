import { NavigationContainer } from '@react-navigation/native';
import React, { FC } from 'react';

const Navigation: FC = ({children}) => (
    <NavigationContainer>{children}</NavigationContainer>
);

export default Navigation;
