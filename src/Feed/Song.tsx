import React from 'react';
import { View, StyleSheet, Text, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../Theme/Theme';
import { Theme } from '../Theme/values';

interface Props {
  author: string;
  post: string;
  songTitle: string;
  artist: string;
  album: string;
  isLiked?: boolean;
  songUrl: string;
  imageUrl: string;
}

export const Song: React.FC<Props> = props => {
  const { author, post, songTitle, artist, album, isLiked } = props;
  const style = useTheme(styleCreator);
  return (
    <View style={style.wrapper}>
      <View style={style.paddedrow}>
        <View style={style.column}>
          <Text style={style.username} ellipsizeMode="tail" numberOfLines={1}>
            {author}
          </Text>
          <Text style={style.postcontent}>{post}</Text>
          <View style={style.row}>
            <View style={style.placeholderAlbumArt} />
            <View style={style.column}>
              <Text
                style={style.songtitle}
                ellipsizeMode="tail"
                numberOfLines={1}>
                {songTitle}
              </Text>
              <Text style={style.artist} ellipsizeMode="tail" numberOfLines={1}>
                {artist} - {album}
              </Text>
            </View>
          </View>
        </View>
        <View style={style.heartcontainer}>
          {isLiked ? (
            <View style={style.placeholderheartfilled} />
          ) : (
            <View style={style.placeholderheart} />
          )}
        </View>
      </View>
      <View style={style.linkSection}>
        <View style={style.placeholderIcon} />
        <View style={style.placeholderIcon} />
        <View style={style.placeholderIcon} />
      </View>
    </View>
  );
};

const styleCreator = (theme: Theme) => ({
  wrapper: {
    backgroundColor: theme.color.surface,
    borderRadius: 8,
    marginVertical: 4,
  } as ViewStyle,
  row: {
    flexDirection: 'row',
  } as ViewStyle,
  paddedrow: {
    flexDirection: 'row',
    padding: 6,
  } as ViewStyle,
  column: {
    flexDirection: 'column',
    padding: 6,
    flex: 1,
  } as ViewStyle,
  username: {
    color: theme.color.text,
    fontWeight: theme.fontWeight.heavy,
    fontSize: theme.fontSize.large,
  } as TextStyle,
  postcontent: {
    color: theme.color.text,
    fontWeight: theme.fontWeight.light,
    fontSize: theme.fontSize.medium,
  } as TextStyle,
  songtitle: {
    color: theme.color.text,
    fontWeight: theme.fontWeight.medium,
    fontSize: theme.fontSize.large,
  } as TextStyle,
  artist: {
    color: theme.color.text,
    fontWeight: theme.fontWeight.light,
    fontSize: theme.fontSize.medium,
  } as TextStyle,
  linkSection: {
    borderTopColor: theme.color.onSurface,
    borderTopWidth: StyleSheet.hairlineWidth,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 16,
  } as ViewStyle,
  placeholderIcon: {
    width: 25,
    height: 25,
    borderRadius: 100,
    backgroundColor: 'grey',
  },
  heartcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 24,
  } as ViewStyle,
  placeholderheart: {
    width: 25,
    height: 25,
    borderRadius: 100,
    backgroundColor: 'grey',
  },
  placeholderheartfilled: {
    width: 25,
    height: 25,
    borderRadius: 100,
    backgroundColor: 'pink',
  },
  placeholderAlbumArt: {
    width: 40,
    height: 40,
    backgroundColor: 'green',
  },
});
