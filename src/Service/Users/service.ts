import { Firestore } from 'firebase/firestore';
import { Auth } from 'firebase/auth';
import Repository, { UserProfile } from './repository';
import { unpackQuerySnapshotWithId } from '../../Common/Firebase/util';

export default function (db: Firestore, auth: Auth) {
  const repository = Repository(db, auth);

  const service = {
    searchUserByName: async (userName: string) =>
      unpackQuerySnapshotWithId(await repository.getUsersByName(userName)),
    getUserProfileById: async (userId: string) =>
      unpackQuerySnapshotWithId(await repository.getUserDataById(userId)),
    getUserProfilesByIds: async (ids: string[]) =>
      unpackQuerySnapshotWithId(await repository.getMultiUserDataByIds(ids)),
    getUserProfile: async () =>
      unpackQuerySnapshotWithId(await repository.getUserData()),
    setUserProfile: async (payload: UserProfile) =>
      repository.setUserData(payload),
  };

  return service;
}
