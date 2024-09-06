import React, { CSSProperties } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import startCase from 'lodash/startCase';
import lowerCase from 'lodash/lowerCase';
import { styled, css } from '@mui/system';

type Props = {
  pages: {
    name: string;
    isDisabled?: boolean;
    error?: boolean;
  }[];
  mainPath: string;
};

export const StyledTabs = styled(Tabs, {
  shouldForwardProp: (props) => props !== 'margin',
})<{ margin?: number }>`
  position: relative;

  &::after {
    content: ' ';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border-bottom: 1px solid rgb(82, 95, 129, 0.3);
  }

  ${({ margin }) =>
    margin &&
    css`
      margin: 0 ${margin}px;
    `}
`;

export const StyledTab = styled(Tab, {
  shouldForwardProp: (props) => props !== 'error',
})<{ error?: boolean }>`
  &.MuiButtonBase-root.MuiTab-root {
    text-transform: initial;
    font-size: 14px;
    text-align: center;
    min-height: initial;

    ${({ error }) =>
      error &&
      css`
        color: red !important;
      `}

    &:not(.Mui-selected) {
      color: ${({ theme }) => theme.palette.grey[700]};
    }

    &.Mui-selected {
      font-weight: bold;
    }
  }
`;

const tabDefaultStyles: CSSProperties = {
  padding: '0 10px',
  textTransform: 'none',
  marginRight: '24px',
  minWidth: 'initial',
  fontWeight: 400,
  letterSpacing: '0.04em',
};

export const getTabStyles = (route: string, name: string): CSSProperties =>
  route.endsWith(name)
    ? { ...tabDefaultStyles, fontWeight: 700 }
    : { ...tabDefaultStyles, color: '#525F81' };

export const LocationTabs: React.FC<Props> = ({ mainPath, pages }) => {
  const { pathname } = useLocation();

  return (
    <StyledTabs value={pathname} indicatorColor="primary" textColor="primary">
      {pages
        .filter(({ isDisabled = false }) => isDisabled === false)
        .map(({ name }, index) => (
          <Tab
            label={startCase(lowerCase(name))}
            value={`${mainPath}/${name}`}
            component={Link}
            to={name}
            disableRipple
            disableFocusRipple
            key={index}
            style={getTabStyles(pathname, name)}
          />
        ))}
    </StyledTabs>
  );
};
