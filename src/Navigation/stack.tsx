import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import * as Screens from '../Screens';
import { useAuthState } from '../Auth/Auth';

const Stack = createNativeStackNavigator();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const StackNavigator = () => {
  const { isLoaded, isAuthenticated } = useAuthState();

  if (!isLoaded) {
    return <Screens.LoadingScreen />;
  }

  return (
    <Stack.Navigator screenOptions={screenOptions}>
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
