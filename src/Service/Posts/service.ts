import { Firestore } from 'firebase/firestore';
import { Auth } from 'firebase/auth';
import Repository from './repository';

export default function (db: Firestore, auth: Auth) {
  const repository = Repository(db, auth);

  const service = {
    getPosts: async (userId: string) => repository.getPostsByUserId(userId),
    getUserPosts: async () => {
      const posts = await repository.getUserPosts();
      return await Promise.all(posts.docs.map(post => post.data()));
      // return posts.docs.map(post => post.data());
    },
  };

  return service;
}
