import React, { FC } from 'react';
import { View } from 'react-native';
import { Collections } from '../../Types/Collection';
import Section from '../../Common/Section';
import { CollectionsList } from './CollectionsList';

interface Props {
  collections: Collections;
}

export const CollectionsSection: FC<Props> = ({ collections }) => (
  <View>
    <Section title="Collections" />
    <CollectionsList collections={collections} />
  </View>
);
