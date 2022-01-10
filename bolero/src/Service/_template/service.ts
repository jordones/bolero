import { Firestore } from 'firebase/firestore';
import { Auth } from 'firebase/auth';
import Repository from './repository';

export default function (db: Firestore, auth: Auth) {
  const repository = Repository(db, auth);

  const service = {
    getUserFollowing: async () => {
      const data = await repository.getUserData();
      return await Promise.all(data.docs.map(el => el.data()));
    },
    addData: async (payload: string) => repository.setDataUser(payload),
  };

  return service;
}
