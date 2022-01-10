import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Screen } from '../Common/Screen';
import { FC } from 'react';
import LoginForm from '../Auth/LoginForm';
import { Theme } from '../Theme/values';
import { useTheme } from '../Theme/Theme';

export const LoginScreen: FC = () => {
  const style = useTheme(stylefn);
  return (
    <Screen>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={style.container}>
        <View style={style.container}>
          <LoginForm />
        </View>
      </ScrollView>
    </Screen>
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
