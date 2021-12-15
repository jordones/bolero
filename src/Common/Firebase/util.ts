import { QuerySnapshot, DocumentData } from 'firebase/firestore';

export async function unpackQuerySnapshotWithId(
  data: QuerySnapshot<DocumentData>,
) {
  return await Promise.all(data.docs.map(el => ({ id: el.id, ...el.data() })));
}

export async function unpackQuerySnapshot(data: QuerySnapshot<DocumentData>) {
  return await Promise.all(data.docs.map(el => el.data()));
}
