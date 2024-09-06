import React, { useContext } from 'react'; // , { useEffect }
import { Box, Stack, Drawer } from '@mui/material';
import { ModviseLogo } from 'components/ModviseLogo/ModviseLogo';
import { useTheme } from '@mui/material/styles';
import { MenuContext } from 'contexts/MenuContext';
import { NAV } from '../../../config-global';
import { NavSectionVertical } from '../nav-section';
import NavToggleButton from './NavToggleButton';
import Scrollbar from '../scrollbar/Scrollbar';

// ----------------------------------------------------------------------

export default function NavVertical() {
  const theme = useTheme();
  const { isMenuOpen, onToggleMenu, navConfig } = useContext(MenuContext);

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: 0,
        width: NAV.W_DASHBOARD,
      }}
    >
      <NavToggleButton openNav={isMenuOpen} handleToggle={onToggleMenu} />

      <Drawer
        open
        variant="permanent"
        PaperProps={{
          sx: {
            zIndex: theme.zIndex.snackbar - 1,
            width: NAV.W_DASHBOARD,
            bgcolor: 'white',
            boxShadow: '2px 0px 4px rgba(0, 0, 0, 0.15)',
          },
        }}
      >
        <Scrollbar
          sx={{
            height: 1,
            '& .simplebar-content': {
              height: 1,
              display: 'flex',
              flexDirection: 'column',
            },
          }}
        >
          <Stack
            // spacing={3}
            sx={{
              pt: 3,
              pb: 1,
              pl: '3px',
              flexShrink: 0,
            }}
          >
            <ModviseLogo />
          </Stack>

          <NavSectionVertical data={navConfig} />

          <Box sx={{ flexGrow: 1 }} />
        </Scrollbar>
      </Drawer>
    </Box>
  );
}
