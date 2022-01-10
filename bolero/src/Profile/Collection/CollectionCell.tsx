import React, { FC } from 'react';
import { Collection } from '../../Types/Collection';
import { Cell } from './Cell';

interface Props {
  collection: Collection;
}

export const CollectionCell: FC<Props> = ({ collection }) => (
  <Cell label={collection.name} onPress={() => {}} visible />
);
