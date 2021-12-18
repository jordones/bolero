import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useFollowService, useUsersService } from '../Service/ServiceProvider';

interface UserDoc {
  id: string;
  name: string;
}

interface SearchResultProps {
  userList: UserDoc[];
  onPressFollow: (id: string) => void;
}
const SearchResults: React.FC<SearchResultProps> = ({
  userList,
  onPressFollow,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const style = resultStyles(isDarkMode);
  return (
    <View>
      {userList.map((user: UserDoc) => (
        <TouchableOpacity
          key={user.name}
          onPress={() => onPressFollow(user.id)}
          style={style.cell}>
          <Text style={style.text}>{user.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const resultStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    cell: {
      borderRadius: 6,
      marginVertical: 4,
      paddingHorizontal: 4,
      paddingVertical: 4,
      borderColor: isDarkMode ? 'white' : 'black',
      borderWidth: 1,
    },
    text: {
      color: isDarkMode ? 'white' : 'black',
    },
  });

export const SearchBar = () => {
  const [searchTerm, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<UserDoc[]>([]);
  const userService = useUsersService();
  const followService = useFollowService();
  const isDarkMode = useColorScheme() === 'dark';
  const style = styles(isDarkMode);

  useEffect(() => {
    const fetchUsers = async (search: string) => {
      const result = await userService.searchUserByName(search);
      if (result) {
        console.log(result);
        setSearchResults(result as UserDoc[]);
      }
    };
    if (searchTerm) {
      fetchUsers(searchTerm);
    }
  }, [searchTerm, userService]);

  return (
    <View style={style.wrapper}>
      <TextInput onChangeText={setSearch} style={style.input} />
      <SearchResults
        userList={searchResults}
        onPressFollow={followService.followUser}
      />
    </View>
  );
};

const styles = (isDarkMode: boolean) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
      paddingHorizontal: 24,
    },
    input: {
      borderColor: isDarkMode ? Colors.lighter : Colors.darker,
      color: isDarkMode ? Colors.white : Colors.black,
      borderWidth: 1,
      borderRadius: 6,
      padding: 8,
    },
  });
