import { DocumentData } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, ViewStyle } from 'react-native';
import {
  useFollowService,
  usePostService,
  useUsersService,
} from '../Service/ServiceProvider';
import { useTheme } from '../Theme/Theme';
import { Theme } from '../Theme/values';
import { Song } from './Song';

export const PostFeed: React.FC = () => {
  const [posts, setPosts] = useState<DocumentData[]>([]);
  const postService = usePostService();
  const followService = useFollowService();
  const usersService = useUsersService();
  const style = useTheme(styleCreator);

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
      {posts.map((e, key) => (
        <Song
          key={key}
          author={e.name ?? 'Me'}
          post={e.comment}
          songTitle={'This is a song'}
          artist={'Wanjo'}
          album={'The Wanjo Album'}
          songUrl={'xyz'}
          imageUrl={'xyz'}
          isLiked={true}
        />
      ))}
    </View>
  );
};

const styleCreator = (theme: Theme) => ({
  wrapper: {
    flex: 1,
    display: 'flex',
    paddingHorizontal: 24,
  } as ViewStyle,
  header: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.color.text,
  },
  body: {
    fontSize: 12,
    color: theme.color.text,
  },
});
