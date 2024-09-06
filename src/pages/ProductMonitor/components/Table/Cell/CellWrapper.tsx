import { styled } from '@mui/system';

interface Props {
  isOdd?: boolean;
  center?: boolean;
}

export const CellWrapper = styled('div', {
  shouldForwardProp: (props) => props !== 'isOdd' && props !== 'center',
})`
  padding: 0 20px;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: ${({ isOdd }: Props) => (isOdd ? 'white' : '#F1F6FD')};
  ${({ center }: Props) => (center ? 'justify-content: center;' : '')};
`;
