import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Screens from '../Screens';
import { useAuthState } from '../Auth/Auth';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { isAuthenticated } = useAuthState();

  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Posts" component={Screens.PostsScreen} />
          <Stack.Screen name="Profile" component={Screens.ProfileScreen} />
          <Stack.Screen name="Search" component={Screens.SearchScreen} />
        </>
      ) : (
        <Stack.Screen name="Login" component={Screens.LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
