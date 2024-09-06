import React from 'react';
import { styled, css } from '@mui/system';
import TableRow from '@mui/material/TableRow';

type StyledTableRowProps = {
  $isLast?: boolean;
  $isFirst?: boolean;
  $isGroupOdd?: boolean;
  $noMiddleBorder?: boolean;
  $isOpen?: boolean;
};

const CustomizedTableRow = styled(TableRow, {
  shouldForwardProp: (props) =>
    props !== '$isGroupOdd' &&
    props !== '$noMiddleBorder' &&
    props !== '$isLast' &&
    props !== '$isFirst' &&
    props !== '$isOpen',
})<StyledTableRowProps>`
  td {
    padding: 11px 30px;
    font-size: 14px;
    color: ${({ theme }) => theme.palette.blueGrey[500]};
    border-bottom: 1px solid ${({ theme }) => theme.palette.grey[200]};
    background: ${({ theme }) => theme.palette.common.white};
  }

  ${({ $isGroupOdd }) =>
    $isGroupOdd &&
    css`
      td {
        background: rgba(82, 95, 129, 0.05);
      }
    `};

  ${({ $noMiddleBorder }) =>
    $noMiddleBorder &&
    css`
      td {
        border: none;
      }
    `}

  ${({ $isLast }) =>
    $isLast &&
    css`
      td {
        border-bottom: none;
      }
    `};

  ${({ $isFirst }) =>
    $isFirst &&
    css`
      td:first-child {
        border-bottom: none;
      }
    `}

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    `}
`;

export const StyledTableRow: React.FC<StyledTableRowProps> = ({
  children,
  ...props
}) => <CustomizedTableRow {...props}>{children}</CustomizedTableRow>;
