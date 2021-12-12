import { addDoc, collection, Firestore, getDocs } from 'firebase/firestore';
import { Auth } from 'firebase/auth';
import { Collections } from '../Collections';

export default function (db: Firestore, auth: Auth) {
  const getDataById = (id: string) =>
    collection(db, `${Collections.following}/${id}/dataPath`);
  const getUserDataCollection = () => getDataById(auth.currentUser!.uid);

  const repository = {
    getUserData: async () => getDocs(getUserDataCollection()),
    setDataUser: async (payload: string) =>
      addDoc(getUserDataCollection(), { payload }),
  };

  return repository;
}
