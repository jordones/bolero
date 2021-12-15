import { DocumentData } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {
  useFollowService,
  usePostService,
  useUsersService,
} from '../Service/ServiceProvider';

export const PostFeed: React.FC = () => {
  const [posts, setPosts] = useState<DocumentData[]>([]);
  const postService = usePostService();
  const followService = useFollowService();
  const usersService = useUsersService();
  const isDarkMode = useColorScheme() === 'dark';

  const style = styles(isDarkMode);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const followedUsers = await followService.getUserFollowing();
        const followedUserIds = followedUsers.map(user => user.userId);
        const followedUserProfiles = await usersService.getUserProfilesByIds(
          followedUserIds,
        );
        const postsByUser = await postService.getUserPosts();

        const postsByFollowedUsers = await postService.getPostsByUserIds(
          followedUserIds,
        );
        const postsByFollowedUsersWithUserProfile = postsByFollowedUsers.map(
          post => ({
            ...post,
            ...followedUserProfiles.find(user => user.id === post.userId),
          }),
        );

        setPosts(
          [...postsByUser, ...postsByFollowedUsersWithUserProfile] ?? [],
        );
      } catch (e) {
        console.warn(e);
      }
    };

    loadPosts();
  }, [postService, followService, usersService]);

  return (
    <View style={style.wrapper}>
      <Text style={style.header}>Posts</Text>
      {posts?.map((e, key) => (
        <TouchableOpacity
          key={key}
          style={style.cell}
          onPress={() => Linking.openURL(e.songUrl)}>
          <Text style={style.header}>{e.name ?? 'Me'}</Text>
          <Text style={style.body}>{e.comment}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = (isDarkMode: boolean) =>
  StyleSheet.create({
    wrapper: {
      backgroundColor: isDarkMode ? 'black' : 'white',
      flex: 1,
      display: 'flex',
    },
    cell: {
      borderRadius: 6,
      marginHorizontal: 4,
      marginVertical: 4,
      paddingHorizontal: 4,
      paddingVertical: 4,
      borderColor: isDarkMode ? 'white' : 'black',
      borderWidth: 1,
    },
    header: {
      fontSize: 16,
      fontWeight: '500',
      color: isDarkMode ? 'white' : 'black',
    },
    body: {
      fontSize: 12,
      color: isDarkMode ? 'white' : 'black',
    },
  });
