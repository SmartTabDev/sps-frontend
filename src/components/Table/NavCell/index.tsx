import React from 'react';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import { styled, css } from '@mui/system';
import { Styled } from 'types/Utils';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

type Direction = 'prev' | 'next';
export type NavCellProps = {
  direction: Direction;
  disabled?: boolean;
  onClick?: () => void;
};

const StyledNavCell = styled(TableCell, {
  shouldForwardProp: (props) => props !== '$disabled' && props !== '$direction',
})<Styled<NavCellProps>>`
  color: ${({ theme }) => theme.palette.primary.main};

  svg {
    cursor: pointer;
    font-size: 24px;
  }

  ${({ $disabled, theme }) =>
    $disabled &&
    css`
      color: ${theme.palette.grey[200]};

      svg {
        cursor: initial;
      }
    `}

  ${({ $direction }) =>
    $direction === 'prev' &&
    css`
      padding-right: 0 !important;
    `}

    ${({ $direction }) =>
    $direction === 'next' &&
    css`
      padding-left: 0 !important;
    `}
`;

const getIcon = (direction: Direction): React.ReactElement => {
  switch (direction) {
    case 'prev':
      return <NavigateBeforeIcon />;
    case 'next':
      return <NavigateNextIcon />;
    default:
      return <></>;
  }
};

const NavCell: React.FC<NavCellProps> = ({
  direction,
  disabled = false,
  onClick,
}) => (
  <StyledNavCell
    $disabled={disabled}
    $direction={direction}
    onClick={() => (disabled === false && onClick ? onClick() : null)}
  >
    <Box display="flex" justifyContent="center">
      {getIcon(direction)}
    </Box>
  </StyledNavCell>
);

export default NavCell;
