import React from 'react';
import TableCell from '@mui/material/TableCell';
import { styled, css } from '@mui/system';
import { AvailabilityStatus } from 'reducers/productAvailability';
import { Styled } from 'types/Utils';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import RemoveIcon from '@mui/icons-material/Remove';

export type AvailableCellProps = {
  status: AvailabilityStatus;
  sticky?: boolean;
};

const StyledAvailableCell = styled(TableCell)<Styled<AvailableCellProps>>`
  svg {
    font-size: 18px;
  }

  ${({ $sticky }) => $sticky
    && css`
      box-shadow: -2px 0px 4px rgba(0, 0, 0, 0.25);
      clip-path: inset(0px -15px 0px -15px);
    `}
`;

const getIcon = (status: AvailabilityStatus): React.ReactElement => {
  switch (status) {
    case 'inStock':
      return <CheckIcon style={{ color: '#286DCB' }} />;
    case 'outOfStock':
      return <CloseIcon style={{ color: '#56CCF2' }} />;
    case 'void':
      return <RemoveIcon style={{ color: '#828282' }} />;
    default:
      return <></>;
  }
};

export const Box = styled('div')`
  display: flex;
  justify-content: center;
`;

export const AvailableCell: React.FC<AvailableCellProps> = ({ status, sticky }) => (
  <StyledAvailableCell $sticky={sticky}>
    <Box>
      {getIcon(status)}
    </Box>
  </StyledAvailableCell>
);

export default AvailableCell;
