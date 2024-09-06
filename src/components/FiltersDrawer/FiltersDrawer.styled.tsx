import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/system';
import ButtonBase from '@mui/material/ButtonBase';

export const FiltersDrawerButton = styled(ButtonBase)`
  color: ${({ theme }) => theme.palette.primary.main};
  box-shadow: -2px 0px 10px rgba(82, 95, 129, 0.5);
  clip-path: inset(0px 0px -10px -15px);
  background: ${({ theme }) => theme.palette.common.white};
  width: 36px;
  height: 50px;
  position: fixed;
  top: 63px;
`;

export const StyledFiltersDrawer = styled(Drawer, {
  shouldForwardProp: (props) => props !== '$drawerWidth',
})<{ $drawerWidth: number }>`
  & .MuiPaper-root {
    width: ${({ $drawerWidth }) => $drawerWidth}px;
    background: #fbfbfc;
    filter: drop-shadow(-8px 0px 24px rgba(59, 69, 94, 0.16));
    border-radius: 15px 0 0 15px;
    background: #ffffff;
    overflow: hidden;

    &::before {
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background: linear-gradient(
        180deg,
        rgba(82, 95, 129, 0.3) 0%,
        rgba(82, 95, 129, 0) 100%
      );
      opacity: 0.1;
      z-index: -1;
    }
  }
`;

export const FiltersDrawerTitle = styled('span')`
  font-family: Lato;
  font-weight: 600;
  font-size: 16px;
  line-height: 40px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.palette.primary.main};
  margin-top: 13px;
  padding: 0 34px;
  color: #3b455e;
`;

export const FiltersDrawerContentContainer = styled('div')`
  width: 100%;
  padding: 0 34px 15px 34px;
`;

export const FiltersDrawerScrollBox = styled(FiltersDrawerContentContainer)`
  max-height: calc(100vh - 40px - 240px);
  overflow-y: auto;
  width: 100%;
  padding: 0 34px 15px 34px;
`;

export const FiltersDrawerContentWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  overflow-y: scroll;
`;

export const FiltersDrawerBackground = styled('div')`
  width: 100%;
  opacity: 0.3;
  position: fixed;
  bottom: 0;
  z-index: -1;

  svg {
    position: absolute;
    bottom: -10px;
    left: 0;
    width: '100%';
    fill: ${({ theme }) => theme.palette.secondary.darker};
  }
`;
