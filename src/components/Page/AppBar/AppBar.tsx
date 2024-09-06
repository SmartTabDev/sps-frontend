import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import { css, styled } from '@mui/system';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ReactCountryFlag from 'react-country-flag';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ConfigContext } from 'contexts/ConfigContext';
import { Skeleton, Stack } from '@mui/material';
import { LogoutSharp } from '@mui/icons-material';
import logout from 'reducers/auth/logout';
import { useDispatch } from 'react-redux';
import ActionHeaderButton from 'components/ActionHeaderButton/ActionHeaderButton';
import useUsername from 'hooks/useUsername';
import { MenuContext } from 'contexts/MenuContext';
import { NAV } from 'config-global';
import { ReactComponent as LorealLogo } from './logos/loreal.svg';

const StyledAppBar = styled(AppBar)<{ $isMenuOpen: boolean }>`
  background: ${({ theme }) => theme.palette.common.white};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  padding: 10px 15px;
  z-index: 1500;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  width: ${({ $isMenuOpen }) =>
    `calc(100% - ${$isMenuOpen ? NAV.W_DASHBOARD : NAV.W_DASHBOARD_MINI}px)`};

  div {
    font-size: 14px;
    color: ${({ theme }) => theme.palette.text.primary};
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;

    button {
      font-size: 14px;
      margin-left: 2px;
      color: ${({ theme }) => theme.palette.text.primary};
      text-transform: initial;
      font-weight: 500;

      svg {
        color: ${({ theme }) => theme.palette.primary.main};
      }
    }
  }
`;

type CountryProps = {
  code: string;
  name: string;
  reverse?: boolean;
};

const StyledCountry = styled('div')<{ $reverse: boolean }>`
  display: flex;
  align-items: center;

  > div {
    margin-left: 6px;
    ${({ $reverse }) =>
      $reverse &&
      css`
        margin-right: 18px;
        order: -1;
      `};
  }
`;

const Country: React.FC<CountryProps> = ({ code, name, reverse = false }) => (
  <StyledCountry $reverse={reverse}>
    {name.toUpperCase()}{' '}
    <div
      style={{
        marginLeft: '6px',
      }}
    >
      <ReactCountryFlag
        countryCode={code}
        svg
        style={{
          width: '1.3em',
          boxShadow: '0 0 0 1px #E4E6EC',
        }}
      />
    </div>
  </StyledCountry>
);

const ModviseAppBar: React.FC = () => {
  const { onConfigReset } = useContext(ConfigContext);
  const { isMenuOpen } = useContext(MenuContext);
  const dispatch = useDispatch();
  const { configs, configId, isMultimarketLoading, onConfigChange } =
    useContext(ConfigContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const selectedConfig = configs.find((c) => (c ? c.id === configId : false));

  const { username } = useUsername();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledAppBar $isMenuOpen={isMenuOpen}>
      {username === 'loreal-pl@modvise.com' ? (
        <LorealLogo style={{ height: '35px' }} />
      ) : (
        <div />
      )}
      <Stack spacing={2} direction="row">
        <div>
          {isMultimarketLoading ? <Skeleton width={170} height={40} /> : null}
          {!isMultimarketLoading && selectedConfig ? (
            <Button
              id="market-button"
              aria-controls="markets"
              aria-haspopup="true"
              aria-expanded={anchorEl ? 'true' : undefined}
              disableElevation
              onClick={handleClick}
              endIcon={configs.length > 1 ? <KeyboardArrowDownIcon /> : null}
              disableRipple
              disableFocusRipple
              variant="text"
              disabled={!(configs.length > 1)}
            >
              <Country code={selectedConfig.code} name={selectedConfig.name} />
            </Button>
          ) : null}
        </div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          sx={{
            zIndex: '9999',
            boxShadow: '0px 4px 9px rgba(82, 95, 129, 0.35)',
            li: {
              fontFamily: 'Karla',
            },
          }}
          PaperProps={{
            style: {
              borderRadius: '0px 0px 5px 5px',
              marginTop: '12px',
            },
          }}
        >
          {configs.map((c) => (
            <MenuItem
              onClick={() => {
                onConfigChange(c.id);
                handleClose();
              }}
              key={c.id}
            >
              <Country code={c.code} name={c.name} reverse />
            </MenuItem>
          ))}
        </Menu>
        <div>
          <ActionHeaderButton
            ActiveIcon={LogoutSharp}
            activeIconProps={{
              sx: { fontSize: '18px' },
            }}
            tooltipProps={{
              title: 'Log out',
            }}
            iconButtonProps={{
              onClick: () => {
                dispatch(logout());
                onConfigReset();
              },
            }}
          />
        </div>
      </Stack>
    </StyledAppBar>
  );
};

export default ModviseAppBar;
