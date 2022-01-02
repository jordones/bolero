/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { initializeApp, getApps } from 'firebase/app';
import { AuthProvider } from './src/Auth/Auth';
import { ServiceProvider } from './src/Service/ServiceProvider';
import { ThemeProvider } from './src/Theme/Theme';
import Navigation from './src/Navigation';
import StackNavigator from './src/Navigation/Stack';

const firebaseConfig = {
  apiKey: 'AIzaSyD_7uTAILVsIe8wNDWWPCE2tlMIc4EDQqY',
  authDomain: 'bolero-app.firebaseapp.com',
  databaseURL: 'https://bolero-app-default-rtdb.firebaseio.com',
  projectId: 'bolero-app',
  storageBucket: 'bolero-app.appspot.com',
  messagingSenderId: '436695980720',
  appId: '1:436695980720:web:ff75c8c5e79be4f37c3975',
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ThemeProvider>
      <Navigation>
        <AuthProvider>
          <ServiceProvider>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <StackNavigator />
          </ServiceProvider>
        </AuthProvider>
      </Navigation>
    </ThemeProvider>
  );
};

export default App;
