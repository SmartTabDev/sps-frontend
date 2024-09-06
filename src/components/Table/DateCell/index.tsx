import React from 'react';
import TableCell from '@mui/material/TableCell';
import { styled, css } from '@mui/system';
import { Styled } from 'types/Utils';

const StyledDateCell = styled(TableCell)<Styled<{ primary: boolean }>>`
  font-weight: normal !important;
  font-size: 14px !important;
  line-height: 17px;
  text-align: center;
  color: ${({ theme }) => theme.palette.blueGrey[400]};
  white-space: nowrap;
  max-width: 100px;

  ${({ $primary, theme }) =>
    $primary &&
    css`
      color: ${theme.palette.primary.main};
      max-width: 150px;
    `}
`;

type Props = {
  primary?: boolean;
};

export const DateCell: React.FC<Props> = ({ children, primary, ...props }) => (
  <StyledDateCell {...props} $primary={primary}>
    {children}
  </StyledDateCell>
);
