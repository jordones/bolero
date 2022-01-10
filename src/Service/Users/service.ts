import { Firestore } from 'firebase/firestore';
import { Auth } from 'firebase/auth';
import Repository, { NewCollectionPayload, UserProfile } from './repository';
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
    getUserSongCollections: async () =>
      unpackQuerySnapshotWithId(await repository.getSongsCollection()),
    getUserProfile: async () => {
      const data = await repository.getUserData();
      const name = data.docs[0].data()?.name;
      return name;
    },
    setUserProfile: async (payload: UserProfile) =>
      repository.setUserData(payload),
    createSongCollection: async (collectionName: NewCollectionPayload) =>
      repository.createSongCollection(collectionName),
  };

  return service;
}
