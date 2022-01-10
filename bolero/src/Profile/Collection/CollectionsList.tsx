import React, { FC } from 'react';
import { FlatList, ViewStyle } from 'react-native';
import { useTheme } from '../../Theme/Theme';
import { Collection, Collections } from '../../Types/Collection';
import { CollectionCell } from './CollectionCell';
import { NewCollectionCell } from './NewCollectionCell';

const DEBUG = false;
interface Props {
  collections: Collections;
}

// Insert data to render the button at the end of the list
const addCollectionPlaceholder: Collection = {
  id: 'add',
  name: '',
  songUrls: [],
};

// Handle rendering the add button
function render({ item }: { item: Collection }) {
  return item.id === 'add' ? (
    <NewCollectionCell visible />
  ) : (
    <CollectionCell collection={item} />
  );
}

export const CollectionsList: FC<Props> = ({ collections }) => {
  const style = useTheme(styleFn);
  return (
    <FlatList
      style={style.list}
      scrollEnabled={false}
      data={[...collections, addCollectionPlaceholder]}
      numColumns={2}
      renderItem={render}
      keyExtractor={({ id }) => id}
      columnWrapperStyle={style.columns}
    />
  );
};

const styleFn = () => ({
  list: {
    paddingHorizontal: 24,
  },
  columns: {
    justifyContent: 'space-between',
    marginBottom: 4,
    ...(DEBUG ? { borderColor: 'red', borderWidth: 1 } : {}),
  } as ViewStyle,
});
