import React from 'react';
import { Box, BoxProps, styled } from '@mui/system';

const StyledPageWrapper = styled(Box)`
  width: 100%;
  height: 100%;
  min-height: 100%;
  position: relative;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const PageWrapper: React.FC<BoxProps> = ({ children }) => (
  <StyledPageWrapper>{children}</StyledPageWrapper>
);

export default PageWrapper;
