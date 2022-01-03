interface Color {
  primary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  disabled: string;
  placeholder: string;
  backdrop: string;
  onSurface: string;
  notification: string;
  icon: string;
  transparent: string;
}

interface FontSize {
  large: number;
  medium: number;
  small: number;
}

interface FontWeight {
  heavy: string;
  medium: string;
  light: string;
}

export interface TabBarHeight {
  height: number;
  setHeight: (height: number) => void;
}

export interface Theme {
  color: Color;
  fontSize: FontSize;
  fontWeight: FontWeight;
  tabBarHeight: TabBarHeight;
}

export type StyleCreator<T> = (theme: Theme) => T;

export const lightColors: Color = {
  primary: '#',
  accent: '#000',
  background: '#fff',
  surface: '#536162',
  text: '#000',
  disabled: '#222',
  placeholder: '#666',
  backdrop: '#eee',
  onSurface: '#424642',
  notification: '#',
  icon: '#efeee6',
  transparent: 'rgba(255, 255, 255, 0.9)',
};

export const darkColors: Color = {
  primary: '#',
  accent: '#fff',
  background: '#000',
  surface: '#424642',
  text: '#fff',
  disabled: '#222',
  placeholder: '#ddd',
  backdrop: '#111',
  onSurface: '#536162',
  notification: '#',
  icon: '#efeee6',
  transparent: 'rgba(0, 0, 0, 0.8)',
};

export const fontSizes: FontSize = {
  large: 16,
  medium: 14,
  small: 12,
};

export const fontWeights: FontWeight = {
  heavy: '500',
  medium: '400',
  light: '300',
};
