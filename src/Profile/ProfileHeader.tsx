import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useAuthState } from '../Auth/Auth';
import { useUsersService } from '../Service/ServiceProvider';
import { useTheme } from '../Theme/Theme';
import { Theme } from '../Theme/values';

const ProfileCircle = () => <View style={circleStyle.circle} />;

const circleStyle = StyleSheet.create({
  circle: {
    height: 40,
    width: 40,
    margin: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DDD',
  },
});

const ProfileHeader = () => {
  const { isAuthenticated } = useAuthState();
  const [userName, setUserName] = useState('');
  const usersService = useUsersService();
  const style = useTheme(styleCreator);
  useEffect(() => {
    const fetchUser = async () => {
      const data = await usersService.getUserProfile();
      console.log(data);
      setUserName(data?.name ?? '');
    };

    fetchUser();
  }, [usersService]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <TouchableOpacity onPress={() => {}}>
      <View style={style.container}>
        <ProfileCircle />
        <Text style={style.header}>{userName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styleCreator = (theme: Theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  } as ViewStyle,
  header: {
    color: theme.color.text,
  },
});

export default ProfileHeader;
