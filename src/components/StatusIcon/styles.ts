import { styled } from '@mui/material';

type Size = 'small' | 'large';

const IconContainer = styled('div', {
  shouldForwardProp: (props) => props !== 'size',
})<{ size: Size }>`
  display: inline-flex;
  align-items: center;
  margin: 0 5px;
  svg {
    font-size: ${({ size }) => (size === 'large' ? '20px' : '12px')};
  }
`;

const StatusText = styled('div', {
  shouldForwardProp: (props) => props !== 'size',
})<{ size: Size }>`
  font-size: ${({ size }) => (size === 'large' ? '12px' : '9px')};
  margin: 0 5px;
  color: ${({ theme }) => theme.palette.blueGrey[400]};
  font-weight: 400;
  line-height: 1.2;
  text-align: center;
`;

export { IconContainer, StatusText };
