import { Firestore } from 'firebase/firestore';
import { Auth } from 'firebase/auth';
import Repository, { UserProfile } from './repository';

export default function (db: Firestore, auth: Auth) {
  const repository = Repository(db, auth);

  const service = {
    searchUserByName: async (userName: string) => {
      const data = await repository.getUsersByName(userName);
      return await Promise.all(
        data.docs.map(el => ({ id: el.id, ...el.data() })),
      );
    },
    getUserProfileById: async (userId: string) => {
      const data = await repository.getUserDataById(userId);
      return await Promise.all(data.docs.map(el => el.data()));
    },
    getUserProfile: async () => {
      const data = await repository.getUserData();
      return await Promise.all(data.docs.map(el => el.data()));
    },
    setUserProfile: async (payload: UserProfile) =>
      repository.setUserData(payload),
  };

  return service;
}
