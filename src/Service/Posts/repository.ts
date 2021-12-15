import { collection, Firestore, getDocs } from 'firebase/firestore';
import { Auth } from 'firebase/auth';
import { Collections } from '../Collections';

export default function (db: Firestore, auth: Auth) {
  const getPostCollectionById = (userId: string) =>
    collection(db, `${Collections.posts}/${userId}/userPosts`);
  const getUserPostCollection = () =>
    getPostCollectionById(auth.currentUser!.uid);

  const repository = {
    getMultiPostsByUserIds: async (ids: string[]) =>
      Promise.all(ids.map(id => getDocs(getPostCollectionById(id)))),
    getPostsByUserId: async (userId: string) =>
      getDocs(getPostCollectionById(userId)),
    getUserPosts: async () => getDocs(getUserPostCollection()),
  };

  return repository;
}
