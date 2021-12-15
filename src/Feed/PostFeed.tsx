import { DocumentData } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
  const style = styles(true);

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
      <Text>Posts</Text>
      {posts?.map((e, key) => (
        <View key={key}>
          <Text>
            {e.comment} posted by: {e.name ? e.name : 'Me'}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = (isDarkMode: boolean) =>
  StyleSheet.create({
    wrapper: {
      backgroundColor: isDarkMode ? 'green' : 'red',
      flex: 1,
      display: 'flex',
    },
  });
