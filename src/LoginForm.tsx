/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState, useEffect, Fragment } from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Button,
  NativeModules,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

const { SharedStorage } = NativeModules;

const signIn = async (
  {
    email,
    password,
  }: {
    email: string;
    password: string;
  },
  callback: (token: string) => void,
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
    // token
    SharedStorage.setString('access_token', data.idToken ?? '');
    SharedStorage.getString(
      'access_token',
      () => {},
      () => {},
    );
    // user id
    SharedStorage.setString('user_id', data.localId ?? '');
    SharedStorage.getString('user_id', callback, () => {});
  }
};

const logout = (callback: (token: string) => void) => {
  SharedStorage.setString('access_token', '');
  SharedStorage.getString(
    'access_token',
    () => {},
    () => {},
  );
  SharedStorage.setString('user_id', '');
  SharedStorage.getString('user_id', callback, () => {});
};

const LoginForm = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const style = styles(isDarkMode);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [auth, setAuth] = useState('');

  useEffect(() => {
    SharedStorage.getString('user_id', setAuth, () => {});
  }, []);

  return (
    <View style={style.view}>
      <Text>{email}</Text>
      {auth ? (
        <Fragment>
          <Text style={style.text}>{`user id: ${auth}`}</Text>
          <Button title="logout" onPress={() => logout(setAuth)} />
        </Fragment>
      ) : (
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
      )}
    </View>
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
