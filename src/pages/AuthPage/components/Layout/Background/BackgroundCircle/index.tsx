import React from 'react';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import { Circle } from 'components/Circle/Circle';

const StyledBox = styled(Box)`
  position: absolute;
  right: -10rem;
  top: -10rem;
  @media (max-width: 1250px) {
    top: 60%;
  }
`;

const BackgroundCircle: React.FC = () => (
  <StyledBox>
    <Circle $size="50rem" $color="#ffffff" />
  </StyledBox>
);

export default BackgroundCircle;
