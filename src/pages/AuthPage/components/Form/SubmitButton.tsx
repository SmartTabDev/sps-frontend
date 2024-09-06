import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import ButtonComponent from 'components/Button/index';
import { styled } from '@mui/system';

const StyledButton = styled(ButtonComponent)`
  margin-top: 15px;
`;

interface Props {
  loading?: boolean;
  disabled?: boolean;
  text: string;
}

export function SubmitButton({ text, loading, disabled }: Props): JSX.Element {
  return (
    <Box display="flex" justifyContent="center">
      <StyledButton size="large" type="submit" disabled={disabled || loading}>
        {loading ? <CircularProgress size={25} color="inherit" /> : text}
      </StyledButton>
    </Box>
  );
}
