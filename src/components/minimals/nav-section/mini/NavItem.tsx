import React, { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Tooltip, Link, ListItemText } from '@mui/material';
// import RoleBasedGuard from '../../../auth/RoleBasedGuard';
import Iconify from '../../iconify';
import { NavItemProps } from '../types';
import { StyledItem, StyledIcon } from './styles';

// ----------------------------------------------------------------------

const NavItem = forwardRef<HTMLDivElement, NavItemProps>(
  ({ item, depth, open, active, isExternalLink, ...other }, ref) => {
    const { title, path, icon: Icon, disabled, caption, roles } = item;

    const subItem = depth !== 1;

    const renderContent = (
      <StyledItem
        ref={ref}
        open={open}
        depth={depth}
        active={active}
        disabled={disabled}
        {...other}
      >
        {Icon && (
          <StyledIcon>
            <Icon
              sx={{
                fontSize: 'initial',
                color: active ? '#447EEB' : '#525F81',
              }}
            />
          </StyledIcon>
        )}

        {subItem && (
          <ListItemText
            primary={title}
            primaryTypographyProps={{
              noWrap: true,
              sx: {
                // width: 72,
                // fontSize: 10,
                // textAlign: 'center',
                lineHeight: '16px',
                ...(active && {
                  fontWeight: 'fontWeightMedium',
                }),
                ...(subItem && {
                  fontSize: 14,
                  width: 'auto',
                  textAlign: 'left',
                }),
              },
            }}
          />
        )}

        {caption && (
          <Tooltip title={caption} arrow placement="right">
            <Iconify
              icon="eva:info-outline"
              width={16}
              sx={{
                top: 11,
                left: 6,
                position: 'absolute',
              }}
            />
          </Tooltip>
        )}
      </StyledItem>
    );

    const renderItem = () => {
      // ExternalLink
      if (isExternalLink)
        return (
          <Link
            href={path}
            target="_blank"
            rel="noopener"
            underline="none"
            sx={{ display: 'flex', width: '100%' }}
          >
            {renderContent}
          </Link>
        );

      // Default
      return (
        <Link
          component={RouterLink}
          to={path}
          underline="none"
          sx={{ display: 'flex', width: '100%' }}
        >
          {renderContent}
        </Link>
      );
    };

    return renderItem();
    // return <RoleBasedGuard roles={roles}> {renderItem()} </RoleBasedGuard>;
  }
);

export default NavItem;
