import React from 'react';
import Icon from 'react-native-vector-icons/Fontisto';
import { useTheme } from '../Theme/Theme';
import { Theme } from '../Theme/values';

export const Profile: React.FC = () => {
  const style = useTheme(styleCreator);

  return (
    <Icon
      name="music-note"
      size={24}
      color={style.icon.color}
      style={style.styles}
    />
  );
};

const styleCreator = (theme: Theme) => ({
  icon: {
    color: theme.color.icon,
  },
  styles: {
    margin: 6,
  },
});
