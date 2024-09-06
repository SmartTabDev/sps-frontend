import TableCell from '@mui/material/TableCell';
import { styled, css } from '@mui/system';

export const TableBodyCell = styled(TableCell)`
  border: 0;
  color: #525f81;
  font-size: 14px;
`;

export const EdgeCell = styled(TableBodyCell)`
  background: ${({ theme }) => theme.palette.common.white};
  width: 25px;
  padding: 0;
`;

export const TableHeaderCell = styled(TableCell, {
  shouldForwardProp: (props) => props !== '$left' && props !== '$right',
})<{
  $left?: boolean;
  $right?: boolean;
}>`
  font-size: 12px;
  line-height: 1;
  padding: 19px 16px 15px 16px;
  max-width: 200px;
  text-transform: uppercase;
  color: #3b455e;
  font-weight: 600;
  border-bottom: 1px solid ${({ theme }) => theme.palette.tableDivider.main};

  text-align: center;
  vertical-align: baseline;

  ${({ $left }) =>
    $left &&
    css`
      text-align: left;
    `}

  ${({ $right }) =>
    $right &&
    css`
      text-align: right;
    `}
`;
