import { styled } from '@mui/system';
import PanelTitle from 'components/PanelTitle';

export const FullWidthHeader = styled(PanelTitle)`
  &::after {
    width: 100%;
  }
`;
