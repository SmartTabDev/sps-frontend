import React, { useEffect, useState, FC } from 'react';
import stickybits from 'stickybits';
import HelpIconOutlined from '@mui/icons-material/HelpOutlined';
import CloseIcon from '@mui/icons-material/Close';
import {
  Drawer,
  IconButton,
  Box,
  Typography,
  alpha,
  ClickAwayListener,
} from '@mui/material';
import { UnifyCard } from 'components/UnifyCard/UnifyCard';
import { useTheme } from '@mui/material/styles';
import { NAV } from 'config-global';
import './styles.css';

interface SlideOutProps {
  title?: string;
  hideOnOutsideClick?: boolean;
  sx?: object;
  paperProps?: object;
}

const SlideOut: FC<SlideOutProps> = ({
  children,
  title = '',
  hideOnOutsideClick,
  sx,
  paperProps,
}) => {
  const { palette } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  useEffect(() => {
    const subscription = stickybits('#slide-out-box', {
      useFixed: true,
      useStickyClasses: true,
      stickyBitStickyOffset: 200,
      stuckClass: 'slide-out-container-stuck',
      stickyClass: 'slide-out-container-sticky',
      parentClass: 'slide-out-container-parent',
    });

    return () => subscription.cleanup();
  }, []);

  const onOutsideClick = () => {
    if (hideOnOutsideClick) {
      closeDrawer();
    }
  };

  return (
    <Box id="slide-out-box" bgcolor="transparent" sx={sx}>
      <UnifyCard
        width="50px"
        height="50px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          position: 'absolute',
          right: -25,
          top: 0,
          borderRadius: '10px 0 0 10px',
          boxShadow: `-8px 0px 24px ${alpha(palette.text.primary, 0.16)}`,
        }}
      >
        <IconButton aria-label="levels help" onClick={openDrawer}>
          <HelpIconOutlined
            sx={{ fontSize: '20px', color: palette.blueGrey[400] }}
          />
        </IconButton>
      </UnifyCard>
      <ClickAwayListener
        mouseEvent="onMouseDown"
        touchEvent="onTouchStart"
        onClickAway={onOutsideClick}
      >
        <Drawer
          PaperProps={{
            sx: {
              position: 'absolute',
              right: -25,
              width: NAV.W_DASHBOARD,
              bgcolor: 'white',
              boxShadow: `-8px 0px 24px ${alpha(palette.text.primary, 0.16)}`,
              height: 'auto',
              borderRadius: '10px 0 0 10px',
              zIndex: 1,
              ...paperProps,
            },
          }}
          open={drawerOpen}
          variant="persistent"
          anchor="right"
          keepMounted={false}
          ModalProps={{
            onClose: closeDrawer,
            BackdropProps: { invisible: true },
          }}
        >
          <Box
            position="relative"
            display="flex"
            justifyContent="space-between"
          >
            <Typography
              variant="h1"
              fontSize="18px"
              fontWeight={600}
              lineHeight="40px"
              color={palette.text.primary}
              p="5px 24px"
            >
              {title}
            </Typography>
            <IconButton
              aria-label="close"
              onClick={closeDrawer}
              disableRipple
              disableTouchRipple
              disableFocusRipple
              sx={{ padding: '5px 16px' }}
            >
              <CloseIcon
                sx={{
                  fontSize: '20px',
                  color: palette.blueGrey[400],
                  lineHeight: '40px',
                }}
              />
            </IconButton>
          </Box>
          <Box mx="14px">{children}</Box>
        </Drawer>
      </ClickAwayListener>
    </Box>
  );
};

export default SlideOut;
