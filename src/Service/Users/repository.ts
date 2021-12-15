import {
  addDoc,
  collection,
  Firestore,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { Auth } from 'firebase/auth';
import { Collections } from '../Collections';

export interface UserProfile {
  userName: String;
}

export default function (db: Firestore, auth: Auth) {
  const getUserCollection = () => collection(db, Collections.users);
  const getUserCollectionById = (id: string) =>
    collection(db, `${Collections.users}/${id}`);
  const getUserDataCollection = () =>
    getUserCollectionById(auth.currentUser!.uid);

  const repository = {
    getUsersByName: async (userName: string) =>
      getDocs(query(getUserCollection(), where('name', '>=', userName))),
    getUserDataById: async (userId: string) =>
      getDocs(getUserCollectionById(userId)),
    getUserData: async () => getDocs(getUserDataCollection()),
    setUserData: async (payload: UserProfile) =>
      addDoc(getUserDataCollection(), payload),
  };

  return repository;
}
