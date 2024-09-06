import React from 'react';
import Box from '@mui/material/Box';
import ButtonComponent from 'components/Button/index';
import { Link } from 'react-router-dom';

export function BackToLoginButton():JSX.Element {
  return (
    <Box display="flex" justifyContent="center">
      <Link to="/">
        <ButtonComponent size="large">Back to log in</ButtonComponent>
      </Link>
    </Box>
  );
}
