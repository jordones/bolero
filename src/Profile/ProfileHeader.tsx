import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { useAuthState } from '../Auth/Auth';

const ProfileCircle = () => <View style={circleStyle.circle} />;

const circleStyle = StyleSheet.create({
  circle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DDD',
  },
});

const ProfileHeader = () => {
  const { isAuthenticated, userId } = useAuthState();
  const isDarkMode = useColorScheme() === 'dark';
  const style = styles(isDarkMode);
  if (!isAuthenticated) {
    return null;
  }

  return (
    <TouchableOpacity style={style.container} onPress={() => {}}>
      <ProfileCircle />
      <Text>{userId}</Text>
    </TouchableOpacity>
  );
};

const styles = (_isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 4,
    },
  });

export default ProfileHeader;
