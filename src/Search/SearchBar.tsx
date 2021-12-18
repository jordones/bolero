import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
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
  return (
    <View>
      {userList.map((user: UserDoc) => (
        <TouchableOpacity
          key={user.name}
          onPress={() => onPressFollow(user.id)}>
          <Text>{user.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export const SearchBar = () => {
  const [searchTerm, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<UserDoc[]>([]);
  const userService = useUsersService();
  const followService = useFollowService();

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
    <View>
      <TextInput onChangeText={setSearch} />
      <SearchResults
        userList={searchResults}
        onPressFollow={followService.followUser}
      />
    </View>
  );
};
