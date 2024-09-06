import { TableCell } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/system';
import LoadableTableCell from 'components/LoadableTableCell/LoadableTableCell';

export const StyledTableRow = styled(TableRow)`
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.palette.tableOddRow};
  }
`;

export const StyledTableCell = styled(TableCell)`
  border-bottom: none;
  color: ${({ theme }) => theme.palette.blueGrey[400]};
  font-weight: 700;
`;

export const StyledLoadableTableCell = styled(LoadableTableCell)`
  border-bottom: none;
  color: ${({ theme }) => theme.palette.blueGrey[400]};
  font-weight: 700;
`;
