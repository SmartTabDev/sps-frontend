import React from 'react';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/system';

type Props = {
  type: 'active' | 'expired' | 'inactive';
};

export type StatusType = Props['type'];

const StyledChip = styled(Chip)`
  width: 66px;
  height: 20px;
  text-transform: capitalize;
  font-size: 12px;
`;

const ActiveChip = styled(StyledChip)`
  background-color: rgba(2, 237, 56, 0.3);
  color: #28a745;
`;

const ExpiredChip = styled(StyledChip)`
  background-color: ${({ theme }) => theme.palette.blueGrey[300]};
  color: rgba(82, 95, 129, 0.5);
`;

const InactiveChip = styled(StyledChip)`
  background-color: ${({ theme }) => theme.palette.secondary.light};
  color: ${({ theme }) => theme.palette.primary.dark};
`;

const Status: React.FC<Props> = ({ type }) => {
  switch (type) {
    case 'active':
      return <ActiveChip label="active" />;
    case 'expired':
      return <ExpiredChip label="expired" />;
    case 'inactive':
      return <InactiveChip label="inactive" />;
    default:
      return null;
  }
};

export default Status;
