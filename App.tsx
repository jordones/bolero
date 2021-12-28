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
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';
import { initializeApp, getApps } from 'firebase/app';
import { AuthProvider, useAuthState } from './src/Auth/Auth';
import LoginForm, { LogoutForm } from './src/Auth/LoginForm';
import ProfileHeader from './src/Profile/ProfileHeader';
import { ServiceProvider } from './src/Service/ServiceProvider';
import { PostFeed } from './src/Feed/PostFeed';
import { SearchBar } from './src/Search/SearchBar';
import Section from './src/Common/Section';
import { ThemeProvider, useTheme } from './src/Theme/Theme';
import { Theme } from './src/Theme/values';

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

const Root = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const { isAuthenticated } = useAuthState();
  const style = useTheme(stylefn);

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={style.wrapper}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={style.container}>
          <View style={style.container}>
            <LoginForm />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <ServiceProvider>
      <SafeAreaView style={style.wrapper}>
        <ProfileHeader />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={style.container}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <View style={style.container}>
            <Section title="Posts" />
            <PostFeed />
            <Section title="Search" />
            <SearchBar />
            <LogoutForm />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ServiceProvider>
  );
};

const stylefn = (theme: Theme) => ({
  wrapper: {
    backgroundColor: theme.color.background,
    flex: 1,
  },
  container: {
    backgroundColor: theme.color.backdrop,
  },
});

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Root />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
