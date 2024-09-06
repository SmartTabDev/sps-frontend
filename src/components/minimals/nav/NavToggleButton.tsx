import React from 'react';
import { useTheme } from '@mui/material/styles';
import { IconButton, IconButtonProps } from '@mui/material';
import { NAV } from '../../../config-global';
import Iconify from '../iconify';

// ----------------------------------------------------------------------

type Props = {
  openNav: boolean;
  handleToggle: VoidFunction;
};

export default function NavToggleButton({
  sx,
  openNav,
  handleToggle,
  ...other
}: IconButtonProps & Props) {
  const theme = useTheme();

  return (
    <IconButton
      size="small"
      onClick={handleToggle}
      sx={{
        zIndex: theme.zIndex.snackbar,
        p: 0.2,
        position: 'fixed',
        left: NAV.W_DASHBOARD - 12,
        border: `solid 1px ${theme.palette.divider}`,
        background: 'white',
        '&:hover': {
          bgcolor: 'background.default',
        },
        ...sx,
        top: '26px',
      }}
      {...other}
    >
      <Iconify
        width={14}
        icon={
          openNav ? 'eva:arrow-ios-back-fill' : 'eva:arrow-ios-forward-fill'
        }
      />
    </IconButton>
  );
}
