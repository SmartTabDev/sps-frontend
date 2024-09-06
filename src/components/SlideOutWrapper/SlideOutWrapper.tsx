import React, { FC } from 'react';
import { Box } from '@mui/material';

export const SlideOutWrapper: FC = ({ children }) => {
  return (
    <Box position="relative" mb="30px">
      {children}
    </Box>
  );
};
