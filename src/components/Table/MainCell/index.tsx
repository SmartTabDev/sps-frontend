import React from 'react';
import { styled } from '@mui/system';
import TableCell from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)`
  font-weight: 700;
  font-size: 14px;
  color: ${({ theme }) => theme.palette.blueGrey[400]};
  vertical-align: top;

  a {
    text-decoration: none;
  }
`;

type MainCellProps = {
  [key: string]: any;
};

const MainCell: React.FC<MainCellProps> = ({ children, ...props }) => (
  <StyledTableCell {...props}>{children}</StyledTableCell>
);

export default MainCell;
