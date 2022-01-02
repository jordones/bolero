import React from 'react';
import Icon from 'react-native-vector-icons/Fontisto';
import { useTheme } from '../Theme/Theme';
import { Theme } from '../Theme/values';
import { Screen } from '../Types/Screens';

interface Props {
  screen: Screen;
}

const screenToIconMap: { [i in Screen]: string } = {
  Posts: 'home',
  Profile: 'at',
  Search: 'search',
  Login: '', // Unused
};

export const NavIcon: React.FC<Props> = ({ screen }) => {
  const style = useTheme(styleCreator);

  return (
    <Icon
      name={screenToIconMap[screen]}
      size={24}
      color={style.icon.color}
      style={style.icon}
    />
  );
};

const styleCreator = (theme: Theme) => ({
  icon: {
    color: theme.color.surface,
  },
});

// export const HeartFilled = () => (
//   <Icon name="heart" size={15} color="#efeee6" />
// );
// export const Heart = () => <Icon name="heart" size={15} color="#222" />;
