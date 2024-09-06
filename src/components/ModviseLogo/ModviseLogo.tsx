import React from 'react';
import { Box } from '@mui/system';
import { ReactComponent as Logotype } from './logotype.svg';
import { ReactComponent as Logo } from './logo.svg';

type Props = {
  logo?: boolean;
};

export const ModviseLogo: React.FC<Props> = ({ logo }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: logo ? 'center' : 'flex-start',
      width: logo ? '40px' : '143px',
      height: '40px',
      my: logo ? 2 : 0,
      mx: logo ? 'auto' : undefined,
      position: logo ? undefined : 'relative',
      top: logo ? 0 : '-6px',
    }}
  >
    {logo ? <Logo /> : <Logotype />}
  </Box>
);
