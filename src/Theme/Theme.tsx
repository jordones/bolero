import React from 'react';
import { useColorScheme } from 'react-native';
import {
  lightColors,
  darkColors,
  fontWeights,
  fontSizes,
  ContextProps,
} from './values';

export const ThemeContext = React.createContext<ContextProps>({
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

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
