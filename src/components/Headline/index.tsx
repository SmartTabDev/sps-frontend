import React from 'react';
import { styled } from '@mui/system';

const StyledHeadline = styled('h1')`
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 26px;
  color: ${({ theme }) => theme.palette.common.black};
`;

const Headline: React.FC = ({ children, ...props }) => (
  <StyledHeadline {...props}>{children}</StyledHeadline>
);

export default Headline;
