import { DocumentData } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { usePostService } from '../Service/ServiceProvider';

export const PostFeed: React.FC = () => {
  const [posts, setPosts] = useState<DocumentData[]>([]);
  const postService = usePostService();
  const style = styles(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const loadedPosts = await postService.getUserPosts();
        console.log(loadedPosts);
        setPosts(loadedPosts ?? []);
      } catch (e) {
        console.warn(e);
      }
    };

    console.log('loading posts');

    loadPosts();
  }, [postService]);

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
