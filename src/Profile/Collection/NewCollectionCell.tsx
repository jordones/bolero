import React, { FC } from 'react';
import { Alert } from 'react-native';
import { useUsersService } from '../../Service/ServiceProvider';
import { Cell } from './Cell';

interface Props {
  visible: boolean;
}

async function promptAddCollection(
  callback: (collectionName: string) => void,
): Promise<void> {
  Alert.prompt('🎶🎶🎶', 'Enter a name for your new collection', callback);
}

export const NewCollectionCell: FC<Props> = props => {
  return (
    <Cell
      label="➕🎶"
      onPress={() => promptAddCollection(console.log)}
      {...props}
    />
  );
};
