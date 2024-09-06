import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';

type Props = {
  width?: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
};

const FancyImg = styled('img')`
  width: ${({ width }) => (width || '4rem')};
`;

const StyledBox = styled(Box)`
  position: absolute;
  ${({ top }) => (top ? `top:${top};` : '')}
  ${({ bottom }) => (bottom ? `bottom:${bottom};` : '')}
  ${({ left }) => (left ? `left:${left};` : '')}
  ${({ right }) => (right ? `right:${right};` : '')}
@media (max-width: 1250px) {
  ${({ top }) => (top ? `top:calc(${top} * 2);` : '')}
  ${({ bottom }) => (bottom ? `bottom:calc(${bottom} * 2);` : '')}
  ${({ left }) => (left ? `left:calc(${left} / 2);` : '')}
  ${({ right }) => (right ? `right:calc(${right} / 2);` : '')}}
`;

const Fancy: React.FC<Props> = (props) => (
  <StyledBox>
    <FancyImg src="/fancy-bg.png" alt="" {...props} />
  </StyledBox>
);

export default Fancy;
