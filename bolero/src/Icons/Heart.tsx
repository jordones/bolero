import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import { useTheme } from '../Theme/Theme';
import { Theme } from '../Theme/values';

interface Props {
  liked?: boolean;
  onPress?: () => void;
}

export const Heart: React.FC<Props> = ({ liked = false, onPress }) => {
  const style = useTheme(styleCreator(liked));
  const touchTarget = {
    top: 15,
    bottom: 15,
    left: 25,
    right: 25,
  };

  return (
    <TouchableOpacity onPress={onPress} hitSlop={touchTarget}>
      <Icon name="heart" size={15} color={style.icon.color} />
    </TouchableOpacity>
  );
};

const styleCreator = (liked: boolean) => (theme: Theme) => ({
  icon: {
    color: liked ? theme.color.icon : theme.color.disabled,
  },
});
