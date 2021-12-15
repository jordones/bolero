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
        const following = await followService.getUserFollowing();
        const followingIds = following.map(follow => follow.userId);
        const userProfiles = await usersService.getUserProfilesByIds(
          followingIds,
        );
        const loadedPosts = await postService.getUserPosts();
        // TODO: instead of looping the query, create a compound query for multiple IDs
        // consider making it show the latest post only and then clicking into the post will
        // fetch entire list by the user
        const loadedFollowingPosts = await Promise.all(
          following.map(follow =>
            postService.getPosts(follow.userId as unknown as string),
          ),
        );

        const followedPostsWithUser = loadedFollowingPosts.flatMap(post =>
          post.map(postData => ({
            ...postData,
            ...userProfiles.find(user => user.id === postData.userId),
          })),
        );
        setPosts([...loadedPosts, ...followedPostsWithUser] ?? []);
      } catch (e) {
        console.warn(e);
      }
    };

    console.log('loading posts');

    loadPosts();
  }, [postService, followService, usersService]);

  return (
    <View style={style.wrapper}>
      <Text>Posts</Text>
      {posts?.map((e, key) => (
        <View key={key}>
          <Text>{e.comment} posted by: {e.name ? e.name : 'Me'}</Text>
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
