import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import {
  TouchableOpacity,
  ViewStyle,
  SafeAreaView,
  Text,
  TextStyle,
} from 'react-native';
import { NavIcon } from '../Icons/NavIcon';
import { useTheme } from '../Theme/Theme';
import { Theme } from '../Theme/values';
import { AllNavigationProps, Screen } from '../Types/Screens';

interface TabButtonStyle {
  button: ViewStyle;
  label: TextStyle;
}

interface TabButtonProps {
  screen: Screen;
  styles: TabButtonStyle;
}

const TabButton: FC<TabButtonProps> = ({ screen, styles }) => {
  const navigation = useNavigation<AllNavigationProps>();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate(screen)}>
      <NavIcon screen={screen} />
      <Text style={styles.label}>{screen}</Text>
    </TouchableOpacity>
  );
};

export const Tabs = () => {
  const style = useTheme(styleFn);

  return (
    <SafeAreaView style={style.bar}>
      <TabButton screen={'Posts'} styles={style} />
      <TabButton screen={'Search'} styles={style} />
      <TabButton screen={'Profile'} styles={style} />
    </SafeAreaView>
  );
};

const styleFn = (theme: Theme) => ({
  bar: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  } as ViewStyle,
  button: {
    justifyConent: 'center',
    alignItems: 'center',
    marginTop: 8,
  } as ViewStyle,
  label: {
    marginTop: 4,
    color: theme.color.text,
    fontSize: theme.fontSize.small,
    fontWeight: theme.fontWeight.light,
  } as TextStyle,
});
