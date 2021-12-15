import { DocumentData } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFollowService, usePostService } from '../Service/ServiceProvider';

export const PostFeed: React.FC = () => {
  const [posts, setPosts] = useState<DocumentData[]>([]);
  const postService = usePostService();
  const followService = useFollowService();
  const style = styles(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const following = await followService.getUserFollowing();
        const loadedPosts = await postService.getUserPosts();
        // TODO: instead of looping the query, create a compound query for multiple IDs
        const loadedFollowingPosts = await Promise.all(
          following.map(follow =>
            postService.getPosts(follow.userId as unknown as string),
          ),
        );
        setPosts(
          [...loadedPosts, ...loadedFollowingPosts.flatMap(x => x)] ?? [],
        );
      } catch (e) {
        console.warn(e);
      }
    };

    console.log('loading posts');

    loadPosts();
  }, [postService, followService]);

  return (
    <View style={style.wrapper}>
      <Text>Posts</Text>
      {posts?.map((e, key) => (
        <View key={key}>
          <Text>{e.comment}</Text>
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
