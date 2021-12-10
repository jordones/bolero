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
import * as firebaseAuth from 'firebase/auth';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Section from '../Common/Section';
import { useAuthState } from './Auth';
import { setAuthProps } from './useAuth';
import { UserCredential } from 'firebase/auth';

async function signIn(
  {
    email,
    password,
  }: {
    email: string;
    password: string;
  },
  callback: (props: setAuthProps) => void,
) {
  try {
    const result: UserCredential =
      await firebaseAuth.signInWithEmailAndPassword(
        firebaseAuth.getAuth(),
        email,
        password,
      );
    const token = await result.user.getIdToken();
    callback({ token, id: result.user.uid });
  } catch (error) {
    console.log(error);
  }
}

export const LogoutForm = () => {
  const { isAuthenticated, setAuth, userId } = useAuthState();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Fragment>
      <Section title="Sign out">{`user id: ${userId}`}</Section>
      <Button title="logout" onPress={() => setAuth()} />
    </Fragment>
  );
};

const LoginForm = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const style = styles(isDarkMode);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { isAuthenticated, setAuth } = useAuthState();

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
