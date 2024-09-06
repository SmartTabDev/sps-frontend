import React from 'react';
import Box from '@mui/material/Box';

import BackgroundLines from './Lines';
import BackgroundCircle from './BackgroundCircle';
import BackgroundFancy from './Fancy';

const BackgroundElements = () => (
  <Box>
    <BackgroundLines hideForMobile />
    <BackgroundCircle />
    <BackgroundFancy right="10rem" top="4rem" />
    <BackgroundFancy left="10rem" bottom="4rem" />
  </Box>
);

export default BackgroundElements;
