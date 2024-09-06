import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import FilterListIcon from '@mui/icons-material/FilterList';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { ReactComponent as Vector1 } from './background/Vector1.svg';
import { ReactComponent as Vector2 } from './background/Vector2.svg';
import { ReactComponent as Vector3 } from './background/Vector3.svg';
import { FiltersDrawerProvider } from './FiltersDrawerContext';
import {
  FiltersDrawerBackground,
  FiltersDrawerButton,
  StyledFiltersDrawer,
  FiltersDrawerContentWrapper,
  FiltersDrawerTitle,
} from './FiltersDrawer.styled';

export const ContentContainer = styled('div')`
  width: 100%;
  padding: 0 34px 80px 34px;
`;

export const ScrollBox = styled(ContentContainer)`
  max-height: calc(100vh - 40px - 240px);
  overflow-y: auto;
  width: 100%;
  padding: 0 34px 15px 34px;
`;

type Props = {
  title: string;
  drawerWidth?: number;
};

const FiltersDrawer: React.FC<Props> = ({
  children,
  title,
  drawerWidth = 640,
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [isInitialised, setIsInitialised] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
    setIsInitialised(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <FiltersDrawerProvider value={{ isOpen: open, setOpen }}>
      <div>
        <CssBaseline />
        <FiltersDrawerButton
          onClick={open ? handleDrawerClose : handleDrawerOpen}
          sx={[
            {
              right: 0,
              width: 36,
              transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
              zIndex: theme.zIndex.drawer + 1,
            },
            open && {
              zIndex: theme.zIndex.drawer + 1,
              marginRight: `${drawerWidth}px`,
              transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          ]}
          disableRipple
        >
          <FilterListIcon />
        </FiltersDrawerButton>
        <StyledFiltersDrawer
          variant="temporary"
          anchor="right"
          ModalProps={{
            onClose: handleDrawerClose,
            BackdropProps: { invisible: true },
          }}
          open={open}
          keepMounted
          $drawerWidth={drawerWidth}
        >
          <FiltersDrawerContentWrapper>
            <FiltersDrawerTitle>{title}</FiltersDrawerTitle>
            {isInitialised ? children : null}
            <FiltersDrawerBackground>
              <Vector1 />
              <Vector2 />
              <Vector3 />
            </FiltersDrawerBackground>
          </FiltersDrawerContentWrapper>
        </StyledFiltersDrawer>
      </div>
    </FiltersDrawerProvider>
  );
};

export default FiltersDrawer;
