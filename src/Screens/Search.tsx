import * as React from 'react';
import { Screen } from '../Common/Screen';
import { FC } from 'react';
import { SearchBar } from 'react-native-screens';
import Section from '../Common/Section';

export const SearchScreen: FC = () => {
  return (
    <Screen>
      <Section title="Search" />
      <SearchBar />
    </Screen>
  );
};
