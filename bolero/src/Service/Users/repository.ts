import {
  addDoc,
  collection,
  documentId,
  Firestore,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { Auth } from 'firebase/auth';
import { Collections, Subcollections } from '../Collections';

export interface UserProfile {
  userName: String;
}

export interface NewCollectionPayload {
  name: string;
}

export default function (db: Firestore, auth: Auth) {
  const getUserCollection = () => collection(db, Collections.users);
  const getUserCollectionById = (id: string) =>
    collection(db, `${Collections.users}/${id}`);
  const getUserSongSubcollectionById = (id: string) =>
    collection(
      db,
      `${Collections.users}/${id}/${Subcollections.songCollections}`,
    );
  const getUserDataCollection = () =>
    getUserCollectionById(auth.currentUser!.uid);
  const getUserSongsSubcollection = () =>
    getUserSongSubcollectionById(auth.currentUser!.uid);

  const repository = {
    getUsersByName: async (userName: string) =>
      getDocs(query(getUserCollection(), where('name', '>=', userName))),
    getUserDataById: async (userId: string) =>
      getDocs(getUserCollectionById(userId)),
    getMultiUserDataByIds: async (ids: string[]) =>
      getDocs(query(getUserCollection(), where(documentId(), 'in', ids))),
    getUserData: async () =>
      getDocs(
        query(
          getUserCollection(),
          where(documentId(), '==', auth.currentUser!.uid),
        ),
      ),
    setUserData: async (payload: UserProfile) =>
      addDoc(getUserDataCollection(), payload),
    getSongsCollection: async () => getDocs(getUserSongsSubcollection()),
    createSongCollection: async (payload: NewCollectionPayload) =>
      addDoc(getUserSongsSubcollection(), payload),
  };

  return repository;
}
