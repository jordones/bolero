import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useFollowService, useUsersService } from '../Service/ServiceProvider';
import { useTheme } from '../Theme/Theme';
import { Theme } from '../Theme/values';

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
  const style = useTheme(resultStyleCreator);
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

const resultStyleCreator = (theme: Theme) => ({
  cell: {
    borderRadius: 6,
    marginVertical: 4,
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderColor: theme.color.accent,
    borderWidth: 1,
  },
  text: {
    color: theme.color.text,
  },
});

export const SearchBar = () => {
  const [searchTerm, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<UserDoc[]>([]);
  const userService = useUsersService();
  const followService = useFollowService();
  const style = useTheme(styleCreator);

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

const styleCreator = (theme: Theme) => ({
  wrapper: {
    flex: 1,
    paddingHorizontal: 24,
  },
  input: {
    borderColor: theme.color.accent,
    color: theme.color.text,
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
  },
});
