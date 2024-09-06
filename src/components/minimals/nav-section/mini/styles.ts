// eslint-disable-next-line react/no-typos
import 'react';
import { styled } from '@mui/material/styles';
import { Popover, ListItemButton, ListItemIcon } from '@mui/material';
import { bgBlur } from 'utils/cssStyles';
import { NavItemProps } from '../types';
import { ICON } from '../../../../config-global';

// ----------------------------------------------------------------------

type StyledItemProps = Omit<NavItemProps, 'item'>;

export const StyledItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'open',
})<StyledItemProps>(({ active, disabled, open, depth, theme }) => {
  const subItem = depth !== 1;

  const activeStyle = {
    color: theme.palette.primary.main,
    backgroundColor: 'rgba(127, 221, 253, 0.2)',
  };

  const activeSubStyle = {
    color: theme.palette.text.primary,
    backgroundColor: 'transparent',
  };

  const hoverStyle = {
    color: theme.palette.text.primary,
    backgroundColor: 'rgba(205, 218, 235,0.5)',
  };

  return {
    flexDirection: 'column',
    textTransform: 'capitalize',
    paddingTop: '14px',
    paddingBottom: '14px',
    color: theme.palette.text.secondary,
    borderRadius: '6px',
    '&:hover': hoverStyle,
    // Sub item
    ...(subItem && {
      flexDirection: 'row',
      padding: theme.spacing(1),
    }),
    // Active item
    ...(active && {
      ...activeStyle,
      '&:hover': {
        ...activeStyle,
      },
    }),
    // Active sub item
    ...(subItem &&
      active && {
        ...activeSubStyle,
        '&:hover': {
          ...activeSubStyle,
        },
      }),
    // Open
    ...(open && !active && hoverStyle),
    // Disabled
    ...(disabled && {
      '&.Mui-disabled': {
        opacity: 0.64,
      },
    }),
  };
});

// ----------------------------------------------------------------------

export const StyledIcon = styled(ListItemIcon)`
  height: 100%;
  width: ${ICON.NAV_ITEM_MINI};
  min-width: ${ICON.NAV_ITEM_MINI};
  display: flex;
  justify-content: center;
`;

// ----------------------------------------------------------------------

export const StyledPopover = styled(Popover)(({ theme }) => ({
  pointerEvents: 'none',
  '& .MuiPopover-paper': {
    width: 160,
    pointerEvents: 'auto',
    padding: theme.spacing(1),
    marginTop: theme.spacing(0.5),
    boxShadow: 'box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '7px',
    ...bgBlur({ color: theme.palette.background.default }),
  },
}));
