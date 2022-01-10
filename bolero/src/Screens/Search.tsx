import * as React from 'react';
import { Screen } from '../Common/Screen';
import { FC } from 'react';
import Section from '../Common/Section';
import { SearchBar } from '../Search/SearchBar';

export const SearchScreen: FC = () => {
  return (
    <Screen>
      <Section title="Search" />
      <SearchBar />
    </Screen>
  );
};
