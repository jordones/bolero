import React from 'react';
import { Text, TextStyle, View } from 'react-native';
import { useTheme } from '../Theme/Theme';
import { Theme } from '../Theme/values';

const Section: React.FC<{
  title: string;
}> = ({ children, title }) => {
  const style = useTheme(styleCreator);
  return (
    <View style={style.sectionContainer}>
      <Text style={style.sectionTitle}>{title}</Text>
      <Text style={style.sectionDescription}>{children}</Text>
    </View>
  );
};

const styleCreator = (theme: Theme) => ({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: theme.fontWeight.heavy,
    color: theme.color.text,
  } as TextStyle,
  sectionDescription: {
    marginTop: 8,
    fontSize: theme.fontSize.medium,
    fontWeight: theme.fontWeight.medium,
    color: theme.color.text,
  } as TextStyle,
});

export default Section;
