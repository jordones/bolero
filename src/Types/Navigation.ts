import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Posts: undefined;
  Search: undefined;
  Profile: undefined | { userId: string };
  Login?: undefined;
};

export type Screen = keyof RootStackParamList;

type PostsScreenProps = NativeStackScreenProps<RootStackParamList, 'Posts'>;
type SearchScreenProps = NativeStackScreenProps<RootStackParamList, 'Search'>;
type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;
type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export type AllNavigationProps =
  | PostsScreenProps['navigation']
  | SearchScreenProps['navigation']
  | ProfileScreenProps['navigation']
  | LoginScreenProps['navigation'];
