import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import { useTheme } from '../Theme/Theme';
import { Theme } from '../Theme/values';

type Brand = 'spotify' | 'applemusic' | 'youtube-play';

interface Props {
  brand: Brand;
  disabled?: boolean;
  onPress?: () => void;
}

export const Logo: React.FC<Props> = ({ brand, disabled = false, onPress }) => {
  const style = useTheme(styleCreator(disabled));
  const touchTarget = {
    top: 15,
    bottom: 15,
    left: 25,
    right: 25,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      hitSlop={touchTarget}>
      <Icon
        name={brand}
        size={20}
        color={style.icon.color}
        style={style.icon}
      />
    </TouchableOpacity>
  );
};

const styleCreator = (disabled: boolean) => (theme: Theme) => ({
  icon: {
    color: theme.color.backdrop,
    opacity: disabled ? 0.5 : 1,
  },
});
