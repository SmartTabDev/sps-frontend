import React from 'react';
import { styled } from '@mui/system';

const LineWrapper = styled('div', {
  shouldForwardProp: (props) => props !== '$color' && props !== '$width',
})<{ $color: string; $width: number }>`
  border-top: 3px solid ${({ $color }) => $color};
  width: ${({ $width }) => $width}%;
`;

export type LineProps = {
  color: string;
  width: number;
};

const Line: React.FC<LineProps> = ({ color, width }) => (
  <LineWrapper $color={color} $width={width} />
);

export default Line;
