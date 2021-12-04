/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Button,
  Settings,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}, callback: (token: string) => void) => {
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
    Settings.set({ access_token: data.idToken ?? 'nil' });
    callback(Settings.get('access_token'));
  }
};

const LoginForm = () => {
  const isDarkMode = useColorScheme() === 'dark';

  // State (TEMP)
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [auth, setAuth] = useState(Settings.get('access_token'));

  return (
    <View
      style={{
        backgroundColor: isDarkMode ? Colors.black : Colors.white,
      }}>
      <Text>{email}</Text>
      <Text>{!!auth && auth !== 'nil' && `user id: ${auth}`}</Text>
      <TextInput
        style={styles.input}
        placeholder="email"
        onChangeText={setEmail}
        secureTextEntry={false}
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button
        title="submit"
        onPress={() => signIn({ email, password }, setAuth)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: Colors.black,
    borderWidth: 1,
    height: 40,
    marginVertical: 4,
    marginHorizontal: 8,
  },
});

export default LoginForm;
