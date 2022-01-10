import { addDoc, collection, Firestore, getDocs } from 'firebase/firestore';
import { Auth } from 'firebase/auth';
import { Collections } from '../Collections';

export default function (db: Firestore, auth: Auth) {
  const getFollowingCollectionById = (userId: string) =>
    collection(db, `${Collections.following}/${userId}/userFollowing`);
  const getUserFollowingCollection = () =>
    getFollowingCollectionById(auth.currentUser!.uid);

  const repository = {
    getUserFollowing: async () => getDocs(getUserFollowingCollection()),
    setFollowingUser: async (userId: string) =>
      addDoc(getUserFollowingCollection(), { userId }),
  };

  return repository;
}
