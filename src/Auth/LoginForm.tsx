/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState, Fragment } from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Button,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import Section from '../Common/Section';
import useAuth, { setAuthProps } from './useAuth';

const signIn = async (
  {
    email,
    password,
  }: {
    email: string;
    password: string;
  },
  callback: (props: setAuthProps) => void,
) => {
  const payload = {
    email,
    password,
    returnSecureToken: true,
  };

  const apiKey = 'AIzaSyD_7uTAILVsIe8wNDWWPCE2tlMIc4EDQqY';
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
  const result = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (result.status === 200) {
    const data = await result.json();
    console.log(data);
    callback({ token: data.idToken, id: data.localId });
  }
};

export const LogoutForm = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const style = styles(isDarkMode);
  const { isAuthenticated, setAuth, userId } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Fragment>
      <Section title="Sign out" />
      <Text style={style.text}>{`user id: ${userId}`}</Text>
      <Button title="logout" onPress={() => setAuth()} />
    </Fragment>
  );
};

const LoginForm = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const style = styles(isDarkMode);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { isAuthenticated, setAuth } = useAuth();

  if (isAuthenticated) {
    return null;
  }

  return (
    <Fragment>
      <Section title="Sign in" />
      <View style={style.view}>
        <Text>{email}</Text>
        <Fragment>
          <TextInput
            style={style.input}
            placeholder="email"
            onChangeText={setEmail}
            secureTextEntry={false}
          />
          <TextInput
            style={style.input}
            placeholder="password"
            secureTextEntry
            onChangeText={setPassword}
          />
          <Button
            title="submit"
            onPress={() => signIn({ email, password }, setAuth)}
          />
        </Fragment>
      </View>
    </Fragment>
  );
};

const styles = (darkMode: boolean) =>
  StyleSheet.create({
    view: {
      backgroundColor: darkMode ? Colors.black : Colors.white,
    },
    input: {
      borderColor: darkMode ? Colors.white : Colors.black,
      color: darkMode ? Colors.white : Colors.black,
      borderWidth: 1,
      height: 40,
      marginVertical: 4,
      marginHorizontal: 8,
    },
    text: {
      color: darkMode ? Colors.white : Colors.black,
    },
  });

export default LoginForm;
