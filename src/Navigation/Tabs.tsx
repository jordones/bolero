import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import {
  TouchableOpacity,
  ViewStyle,
  SafeAreaView,
  Text,
  TextStyle,
  LayoutChangeEvent,
  View,
} from 'react-native';
import { useAuthState } from '../Auth/Auth';
import { NavIcon } from '../Icons/NavIcon';
import { useTabBarHeight, useTheme } from '../Theme/Theme';
import { Theme } from '../Theme/values';
import { AllNavigationProps, Screen } from '../Types/Navigation';

interface TabButtonStyle {
  button: ViewStyle;
  label: TextStyle;
}

interface TabButtonProps {
  screen: Screen;
  styles: TabButtonStyle;
  navigation: AllNavigationProps;
}

const TabButton: FC<TabButtonProps> = ({ screen, styles, navigation }) => (
  <TouchableOpacity
    style={styles.button}
    onPress={() => navigation.navigate(screen)}>
    <NavIcon screen={screen} />
    <Text style={styles.label}>{screen}</Text>
  </TouchableOpacity>
);

export const Tabs = () => {
  const style = useTheme(styleFn);
  const navigation = useNavigation<AllNavigationProps>();
  const { isLoaded, isAuthenticated } = useAuthState();

  // Handle Layout Shift
  const { setHeight } = useTabBarHeight();
  const handleLayoutEvent = (event: LayoutChangeEvent) =>
    setHeight(event.nativeEvent.layout.height);

  if (!isLoaded || !isAuthenticated) {
    return null;
  }

  return (
    <SafeAreaView style={style.bar}>
      <View style={style.content} onLayout={handleLayoutEvent}>
        <TabButton navigation={navigation} screen={'Posts'} styles={style} />
        <TabButton navigation={navigation} screen={'Search'} styles={style} />
        <TabButton navigation={navigation} screen={'Profile'} styles={style} />
      </View>
    </SafeAreaView>
  );
};

const styleFn = (theme: Theme) => ({
  bar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: theme.color.transparent,
  } as ViewStyle,
  content: {
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
