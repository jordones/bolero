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
  Alert.prompt('πΆπΆπΆ', 'Enter a name for your new collection', callback);
}

export const NewCollectionCell: FC<Props> = props => {
  const usersService = useUsersService();
  return (
    <Cell
      label="βπΆ"
      onPress={() =>
        promptAddCollection(name => usersService.createSongCollection({ name }))
      }
      {...props}
    />
  );
};
