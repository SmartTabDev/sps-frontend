import Card from '@mui/material/Card';
import { styled } from '@mui/system';

export const RecapWrapper = styled(Card)`
  box-shadow: none;
  width: calc(100% - 2 * 24px);
  margin-left: auto;
  margin-right: auto;
  display: grid;
  overflow: visible;
  gap: 24px;
`;
