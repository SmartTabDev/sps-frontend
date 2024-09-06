import React from 'react';
import { Box, styled } from '@mui/system';

type Props = {
  width?: number;
  height: number;
  background: string;
  margin?: string;
};

const StyledLine = styled(Box)<Props>`
  border-radius: 0px 10px 10px 0px;
  background: ${({ background }) => background};
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  height: ${({ height }) => height}px;
  ${({ margin }) => (margin ? `margin:${margin};` : '')}
`;

export const Line: React.FC<Props> = (props) => (
  <div>
    <StyledLine {...props} />
  </div>
);
