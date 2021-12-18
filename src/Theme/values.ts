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

export interface Theme {
  color: Color;
  fontSize: FontSize;
  fontWeight: FontWeight;
}

export type StyleCreator<T> = (theme: Theme) => T;

export const lightColors: Color = {
  primary: '#',
  accent: '#000',
  background: '#fff',
  surface: '#536162',
  text: '#000',
  disabled: '#',
  placeholder: '#666',
  backdrop: '#eee',
  onSurface: '#424642',
  notification: '#',
};

export const darkColors: Color = {
  primary: '#',
  accent: '#fff',
  background: '#000',
  surface: '#424642',
  text: '#fff',
  disabled: '#',
  placeholder: '#ddd',
  backdrop: '#111',
  onSurface: '#536162',
  notification: '#',
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
