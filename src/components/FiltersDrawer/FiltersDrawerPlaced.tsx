import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import ActionHeaderButton from 'components/ActionHeaderButton/ActionHeaderButton';
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';
import { IconButton } from '@mui/material';
import { ReactComponent as Vector1 } from './background/Vector1.svg';
import { ReactComponent as Vector2 } from './background/Vector2.svg';
import { ReactComponent as Vector3 } from './background/Vector3.svg';
import { FiltersDrawerProvider } from './FiltersDrawerContext';
import {
  FiltersDrawerBackground,
  StyledFiltersDrawer,
  FiltersDrawerContentWrapper,
  FiltersDrawerTitle,
} from './FiltersDrawer.styled';

type Props = {
  title: string;
  drawerWidth?: number;
};

const FiltersDrawerPlaced: React.FC<Props> = ({
  children,
  title,
  drawerWidth = 640,
}) => {
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
        <ActionHeaderButton
          ActiveIcon={FilterListIcon}
          tooltipProps={{
            title: 'Filters',
          }}
          iconButtonProps={{
            onClick: open ? handleDrawerClose : handleDrawerOpen,
          }}
        />
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
            <IconButton
              onClick={handleDrawerClose}
              sx={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                color: '#3B455E',
              }}
            >
              <CloseIcon sx={{ fontSize: '17px' }} />
            </IconButton>
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

export default FiltersDrawerPlaced;
