import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '../../Theme/Theme';
import { Theme } from '../../Theme/values';

interface Props {
  label: string;
  onPress: () => void;
  visible: boolean;
}

export const Cell: FC<Props> = ({ label, onPress, visible }) => {
  const style = useTheme(styleFn);

  if (!visible) {
    return null;
  }

  return (
    <TouchableOpacity onPress={onPress} style={style.container}>
      <Text style={style.label}>{label}</Text>
    </TouchableOpacity>
  );
};
const styleFn = (theme: Theme) => ({
  container: {
    width: '49%',
    height: 30,
    borderRadius: 4,
    backgroundColor: theme.color.backdrop,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.color.text,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  label: {
    color: theme.color.text,
    fontSize: theme.fontSize.large,
    fontWeight: theme.fontWeight.heavy,
  } as TextStyle,
});
