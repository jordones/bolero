import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { useAuthState } from '../Auth/Auth';
import { useUsersService } from '../Service/ServiceProvider';

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
  const isDarkMode = useColorScheme() === 'dark';
  const style = styles(isDarkMode);

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
    <TouchableOpacity style={style.container} onPress={() => {}}>
      <ProfileCircle />
      <Text style={style.header}>{userName}</Text>
    </TouchableOpacity>
  );
};

const styles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 4,
    },
    header: {
      color: isDarkMode ? 'white' : 'black',
    },
  });

export default ProfileHeader;
