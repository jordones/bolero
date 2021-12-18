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

export interface ContextProps {
  color: Color;
  fontSize: FontSize;
  fontWeight: FontWeight;
}

export const lightColors: Color = {
  primary: '#',
  accent: '#',
  background: '#',
  surface: '#',
  text: '#',
  disabled: '#',
  placeholder: '#',
  backdrop: '#',
  onSurface: '#',
  notification: '#',
};

export const darkColors: Color = {
  primary: '#',
  accent: '#',
  background: '#',
  surface: '#',
  text: '#',
  disabled: '#',
  placeholder: '#',
  backdrop: '#',
  onSurface: '#',
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
