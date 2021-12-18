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
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import { initializeApp, getApps } from 'firebase/app';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { AuthProvider, useAuthState } from './src/Auth/Auth';
import LoginForm, { LogoutForm } from './src/Auth/LoginForm';
import ProfileHeader from './src/Profile/ProfileHeader';
import { ServiceProvider } from './src/Service/ServiceProvider';
import { PostFeed } from './src/Feed/PostFeed';
import { SearchBar } from './src/Search/SearchBar';

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
  const style = styles(isDarkMode);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={style.wrapper}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
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
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View style={style.container}>
          <ProfileHeader />
          <PostFeed />
          <SearchBar />
          <LogoutForm />
        </View>
      </SafeAreaView>
    </ServiceProvider>
  );
};

const styles = (isDarkMode: boolean) =>
  StyleSheet.create({
    wrapper: {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
      flex: 1,
    },
    container: {
      backgroundColor: isDarkMode ? Colors.black : Colors.white,
      flex: 1,
    },
  });

const App = () => {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
};

export default App;
