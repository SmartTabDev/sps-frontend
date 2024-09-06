import { Chip } from '@mui/material';
import { styled } from '@mui/system';

export const KeywordChip = styled(Chip)`
  border: 2px solid ${({ theme }) => theme.palette.tableDivider.main};
  background-color: white;
  font-weight: 500;
  font-size: 14px;
  color: #525f81;
`;
