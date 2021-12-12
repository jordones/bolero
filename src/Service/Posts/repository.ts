import { collection, Firestore, getDocs } from 'firebase/firestore';
import { Auth } from 'firebase/auth';

enum Collections {
  posts = 'posts',
  following = 'folowing',
}

export default function (db: Firestore, auth: Auth) {
  // const getPostCollection = () => collection(db, Collections.posts);
  const getPostCollectionById = (userId: string) =>
    collection(db, `${Collections.posts}/${userId}/userPosts`);
  const getUserPostCollection = () =>
    getPostCollectionById(auth.currentUser!.uid);

  const repository = {
    getPostsByUserId: async (userId: string) =>
      getDocs(getPostCollectionById(userId)),
    getUserPosts: async () => getDocs(getUserPostCollection()),
  };

  return repository;
}
