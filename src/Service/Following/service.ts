import { Firestore } from 'firebase/firestore';
import { Auth } from 'firebase/auth';
import Repository from './repository';

export default function (db: Firestore, auth: Auth) {
  const repository = Repository(db, auth);

  const service = {
    getUserFollowing: async () => {
      const following = await repository.getUserFollowing();
      return await Promise.all(following.docs.map(follow => follow.data()));
    },
    followUser: async (userId: string) => repository.setFollowingUser(userId),
  };

  return service;
}
