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
import { TextInput, Button } from 'react-native';
import * as firebaseAuth from 'firebase/auth';
import Section from '../Common/Section';
import { useAuthState } from './Auth';
import { useTheme } from '../Theme/Theme';
import { Theme } from '../Theme/values';

async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    await firebaseAuth.signInWithEmailAndPassword(
      firebaseAuth.getAuth(),
      email,
      password,
    );
  } catch (error) {
    console.log(error);
  }
}

export const LogoutForm = () => {
  const { isAuthenticated, userId, signOut } = useAuthState();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Fragment>
      <Section title="Sign out">{`user id: ${userId}`}</Section>
      <Button title="logout" onPress={signOut} />
    </Fragment>
  );
};

const LoginForm = () => {
  const style = useTheme(styleCreator);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { isAuthenticated } = useAuthState();

  if (isAuthenticated) {
    return null;
  }

  return (
    <Fragment>
      <Section title="Sign in" />
      <Fragment>
        <TextInput
          style={style.input}
          placeholder="email"
          onChangeText={setEmail}
          placeholderTextColor={style.placeholder.color}
          secureTextEntry={false}
        />
        <TextInput
          style={style.input}
          placeholder="password"
          secureTextEntry
          placeholderTextColor={style.placeholder.color}
          onChangeText={setPassword}
        />
        <Button title="submit" onPress={() => signIn({ email, password })} />
      </Fragment>
    </Fragment>
  );
};

const styleCreator = (theme: Theme) => ({
  input: {
    borderColor: theme.color.accent,
    color: theme.color.text,
    borderWidth: 1,
    height: 40,
    marginVertical: 4,
    marginHorizontal: 8,
  },
  text: {
    color: theme.color.text,
  },
  placeholder: {
    color: theme.color.placeholder,
  },
});

export default LoginForm;
