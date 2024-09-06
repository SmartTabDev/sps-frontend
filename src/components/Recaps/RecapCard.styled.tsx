import { styled, Box } from '@mui/system';
import { Typography } from '@mui/material';

export const NA = styled(Typography)`
  color: ${({ theme }) => theme.palette.grey[400]};
  line-height: 1.5;
  margin-block-start: 0px;
  margin-block-end: 0px;
  margin-top: 5px;
  font-size: 18px;
`;

export const LeftSide = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-width: 122px;
`;

export const RightSide = styled(Box)`
  position: relative;
  width: 100%;
`;
