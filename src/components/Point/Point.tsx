import { styled } from '@mui/system';
import Box from '@mui/material/Box';

export const Point = styled(Box, {
  shouldForwardProp: (props) => props !== '$size' && props !== '$color',
})<{ $size: string; $color: string }>`
  margin-right: calc(40px / 2 - ${({ $size }) => $size} / 2);
  position: relative;
  min-width: 40px;

  &::after {
    background: ${({ theme }) => theme.palette.common.white};
    border-radius: 50%;
    border: 2px solid ${({ $color }) => $color};
    content: '';
    display: block;
    height: ${({ $size }) => $size};
    left: 50%;
    position: absolute;
    transform: translate(-50%,-50%);
    width: ${({ $size }) => $size};
  }

  &::before {
    background: ${({ $color }) => $color};
    content: '';
    display: block;
    height: 2px;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 40px;
  }
`;
