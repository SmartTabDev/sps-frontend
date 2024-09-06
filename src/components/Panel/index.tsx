import React from 'react';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';

const StyledBox = styled(Box)`
  /* margin: ${({ margin }: any) => margin || '0 24px'}; */
  box-shadow: 0px -2px 0px rgba(0, 0, 0, 0.02), 0px 4px 16px rgba(0, 0, 0, 0.15);
  padding: ${({ padding }: any) => padding || '25px 23px'};
  ${({ color }) => (color ? `background-color: ${color}` : '')};
  width: calc(100% - 2 * 24px);
  border-radius: 10px;
`;

export type PanelProps = {
  margin?: string;
  padding?: string;
  color?: string;
};

const Panel: React.FC<PanelProps> = ({ children, ...props }) => (
  <StyledBox {...props}>{children}</StyledBox>
);

export default Panel;
