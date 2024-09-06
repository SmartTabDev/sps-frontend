import { styled } from '@mui/system';
import Box from '@mui/material/Box';

export const Circle = styled(Box, {
  shouldForwardProp: (props) => props !== '$size' && props !== '$color',
})<{ $size: string; $color: string }>`
  height: ${({ $size }) => $size};
  width: ${({ $size }) => $size};
  border-radius: 50%;
  background: ${({ $color }) => $color};
`;
