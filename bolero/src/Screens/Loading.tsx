import * as React from 'react';
import { ActivityIndicator, View, ViewStyle } from 'react-native';
import { Screen } from '../Common/Screen';
import { FC } from 'react';
import { Theme } from '../Theme/values';
import { useTheme } from '../Theme/Theme';

export const LoadingScreen: FC = () => {
  const style = useTheme(stylefn);
  return (
    <Screen>
      <View style={style.container}>
        <ActivityIndicator size={'large'} />
      </View>
    </Screen>
  );
};

const stylefn = (theme: Theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.color.background,
  } as ViewStyle,
});
