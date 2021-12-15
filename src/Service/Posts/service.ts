import { Firestore } from 'firebase/firestore';
import { Auth } from 'firebase/auth';
import Repository from './repository';

export default function (db: Firestore, auth: Auth) {
  const repository = Repository(db, auth);

  const service = {
    getPosts: async (userId: string) => {
      const posts = await repository.getPostsByUserId(userId);
      return Promise.all(posts.docs.map(post => ({ userId, ...post.data() })));
    },
    getUserPosts: async () => {
      const posts = await repository.getUserPosts();
      return Promise.all(posts.docs.map(post => post.data()));
    },
  };

  return service;
}
