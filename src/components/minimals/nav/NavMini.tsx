import React, { useContext } from 'react';
import { Stack, Box } from '@mui/material';
import { ModviseLogo } from 'components/ModviseLogo/ModviseLogo';
import { hideScrollbarX } from 'utils/cssStyles';
import { useTheme } from '@mui/material/styles';
import { MenuContext } from 'contexts/MenuContext';
import { NAV } from '../../../config-global';
import { NavSectionMini } from '../nav-section';
import NavToggleButton from './NavToggleButton';

// ----------------------------------------------------------------------

export default function NavMini() {
  const theme = useTheme();
  const { isMenuOpen, onToggleMenu, navConfig } = useContext(MenuContext);

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: 0,
        width: NAV.W_DASHBOARD_MINI,
      }}
    >
      <NavToggleButton
        openNav={isMenuOpen}
        handleToggle={onToggleMenu}
        sx={{
          top: 22,
          left: NAV.W_DASHBOARD_MINI - 12,
        }}
      />

      <Stack
        sx={{
          zIndex: theme.zIndex.snackbar - 1,
          top: 0,
          left: 0,
          backgroundColor: 'white',
          pb: 2,
          height: 1,
          position: 'fixed',
          width: NAV.W_DASHBOARD_MINI,
          boxShadow: '2px 0px 4px rgba(0, 0, 0, 0.15)',
          ...hideScrollbarX,
        }}
      >
        <ModviseLogo logo />

        <NavSectionMini data={navConfig} />
      </Stack>
    </Box>
  );
}
