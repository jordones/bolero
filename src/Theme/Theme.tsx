import React, { useState } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import {
  lightColors,
  darkColors,
  fontWeights,
  fontSizes,
  Theme,
  StyleCreator,
  TabBarHeight,
} from './values';

export const ThemeContext = React.createContext<Theme>({
  color: lightColors,
  fontSize: fontSizes,
  fontWeight: fontWeights,
  tabBarHeight: { setHeight: () => {}, height: 0 },
});

export const ThemeProvider: React.FC = ({ children }) => {
  const colorScheme = useColorScheme();
  const [tabBarHeight, setTabBarHeight] = useState(0);
  return (
    <ThemeContext.Provider
      value={{
        color: colorScheme === 'dark' ? darkColors : lightColors,
        fontSize: fontSizes,
        fontWeight: fontWeights,
        tabBarHeight: { height: tabBarHeight, setHeight: setTabBarHeight },
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTabBarHeight(): TabBarHeight {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context.tabBarHeight;
}

export function useTheme<Type>(styleFn: StyleCreator<Type>): Type {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return StyleSheet.create(styleFn(context));
}
