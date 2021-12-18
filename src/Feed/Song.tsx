import React from 'react';
import { View, StyleSheet, Text, useColorScheme } from 'react-native';

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
  const isDarkMode = useColorScheme() === 'dark';
  const style = styles(isDarkMode);
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

const styles = (isDarkMode: boolean) =>
  StyleSheet.create({
    wrapper: {
      backgroundColor: isDarkMode ? '#536162' : '#424642',
      borderRadius: 8,
      marginVertical: 4,
    },
    row: {
      flexDirection: 'row',
    },
    paddedrow: {
      flexDirection: 'row',
      padding: 6,
    },
    column: {
      flexDirection: 'column',
      padding: 6,
      flex: 1,
    },
    username: {
      color: isDarkMode ? 'white' : 'black',
      fontWeight: '600',
      fontSize: 16,
    },
    postcontent: {
      color: isDarkMode ? 'white' : 'black',
      fontWeight: '400',
      fontSize: 14,
    },
    songtitle: {
      color: isDarkMode ? 'white' : 'black',
      fontWeight: '600',
      fontSize: 16,
    },
    artist: {
      color: isDarkMode ? 'white' : 'black',
      fontWeight: '500',
      fontSize: 14,
    },
    linkSection: {
      borderTopColor: isDarkMode ? '#424642' : '#536162',
      borderTopWidth: StyleSheet.hairlineWidth,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      flexDirection: 'row',
      padding: 16,
    },
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
    },
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
