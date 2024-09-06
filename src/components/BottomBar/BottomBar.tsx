import React, { useContext } from 'react';
import { Box, styled } from '@mui/system';
import { MenuContext } from 'contexts/MenuContext';
import { NAV } from 'config-global';

const StyledBottomBar = styled(Box)`
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1500;
`;

const StyledBottomBarContent = styled('div')`
  background: ${({ theme }) => theme.palette.common.white};
  opacity: 0.9;
  box-shadow: 0px -4px 8px rgba(82, 95, 129, 0.1);
  height: 40px;
  padding: 0 24px 0 calc(60px + 24px);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BottomBar: React.FC = ({ children }) => {
  const { isMenuOpen } = useContext(MenuContext);

  return (
    <StyledBottomBar
      sx={{
        left: isMenuOpen ? NAV.W_DASHBOARD : NAV.W_DASHBOARD_MINI,
      }}
    >
      <StyledBottomBarContent
        sx={{
          flexGrow: 1,
          width: `calc(100% - ${NAV.W_DASHBOARD}px)`,
          ...(!isMenuOpen && {
            width: `calc(100% - ${NAV.W_DASHBOARD_MINI}px)`,
          }),
        }}
      >
        {children}
      </StyledBottomBarContent>
    </StyledBottomBar>
  );
};

export default BottomBar;
