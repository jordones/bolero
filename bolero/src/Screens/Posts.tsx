import * as React from 'react';
import { Screen } from '../Common/Screen';
import { FC } from 'react';
import { PostFeed } from '../Feed/PostFeed';
import Section from '../Common/Section';
import { useTheme } from '../Theme/Theme';
import { ScrollView, View } from 'react-native';
import { Theme } from '../Theme/values';

export const PostsScreen: FC = () => {
  const style = useTheme(stylefn);
  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        style={style.container}>
        <View style={[style.container, style.tabBarPad]}>
          <Section title="Posts" />
          <PostFeed />
        </View>
      </ScrollView>
    </Screen>
  );
};

const stylefn = (theme: Theme) => ({
  container: {
    backgroundColor: theme.color.backdrop,
  },
  tabBarPad: {
    paddingBottom: theme.tabBarHeight.height,
  },
});
