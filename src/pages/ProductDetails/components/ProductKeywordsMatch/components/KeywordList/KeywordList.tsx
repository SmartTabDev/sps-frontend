import React from 'react';
import { Stack } from '@mui/material';
import { KeywordChip } from './styles';

export interface Keyword {
  name: string;
  otherVariations: string[];
}

interface KeywordListProps {
  keywords: Keyword[];
}

const KeywordList = ({ keywords }: KeywordListProps) => {
  return (
    <Stack gap="16px">
      {keywords.map(({ name, otherVariations }) => (
        <Stack
          key={name}
          gap="6px"
          direction="row"
          alignItems="flex-start"
          flexWrap="wrap"
        >
          <KeywordChip label={name} />
          {otherVariations.map((variation) => (
            <KeywordChip key={variation} label={variation} />
          ))}
        </Stack>
      ))}
    </Stack>
  );
};

export default KeywordList;
