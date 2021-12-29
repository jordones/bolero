import { useTheme } from '../Theme/Theme';
import React, { FC } from 'react';
import { SafeAreaView } from 'react-native';
import { Theme } from '../Theme/values';

export const Screen: FC = ({ children }) => {
  const style = useTheme(stylefn);

  return <SafeAreaView style={style.wrapper}>{children}</SafeAreaView>;
};

const stylefn = (theme: Theme) => ({
  wrapper: {
    backgroundColor: theme.color.background,
    flex: 1,
  },
});
