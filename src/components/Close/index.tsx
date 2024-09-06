import React from 'react';
import { styled } from '@mui/system';
import * as Icons from 'react-icons/md';

const StyledClose = styled('div')`
  font-size: 22px;
  line-height: 22px;
`;

const Close: React.FC = () => {
  const Icon = Icons.MdHighlightOff;

  return <StyledClose><Icon /></StyledClose>;
};

export default Close;
