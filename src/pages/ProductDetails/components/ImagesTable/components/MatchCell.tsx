import React from 'react';
import { Check, HorizontalRule } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

interface MatchCellProps {
  match: boolean;
}

const MatchCell = ({ match }: MatchCellProps) => {
  const { palette } = useTheme();
  if (match) {
    return (
      <Check
        sx={{ fontSize: '18px', fontWeight: 400, color: palette.blueGrey[400] }}
      />
    );
  }

  return (
    <HorizontalRule
      sx={{ fontSize: '18px', fontWeight: 400, color: palette.blueGrey[400] }}
    />
  );
};

export default MatchCell;
