import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import {
  lightColors,
  darkColors,
  fontWeights,
  fontSizes,
  Theme,
  StyleCreator,
} from './values';

export const ThemeContext = React.createContext<Theme>({
  color: lightColors,
  fontSize: fontSizes,
  fontWeight: fontWeights,
});

export const ThemeProvider: React.FC = ({ children }) => {
  const colorScheme = useColorScheme();
  return (
    <ThemeContext.Provider
      value={{
        color: colorScheme === 'dark' ? darkColors : lightColors,
        fontSize: fontSizes,
        fontWeight: fontWeights,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme<Type>(styleFn: StyleCreator<Type>): Type {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return StyleSheet.create(styleFn(context));
}
