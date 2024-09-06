import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Tooltip, Link, ListItemText } from '@mui/material';
// import RoleBasedGuard from '../../../auth/RoleBasedGuard';
import Iconify from '../../iconify';
import { NavItemProps } from '../types';
import { StyledItem, StyledIcon, StyledDotIcon } from './styles';

// ----------------------------------------------------------------------

export default function NavItem({
  item,
  depth,
  open,
  active,
  isExternalLink,
  ...other
}: NavItemProps) {
  const {
    title,
    path,
    icon: Icon,
    info,
    children,
    disabled,
    caption,
    roles,
  } = item;

  const subItem = depth !== 1;

  const renderContent = (
    <StyledItem
      depth={depth}
      active={active}
      disabled={disabled}
      caption={!!caption}
      {...other}
    >
      {Icon && (
        <StyledIcon>
          <Icon
            sx={{ fontSize: 'initial', color: active ? '#447EEB' : '#525F81' }}
          />
        </StyledIcon>
      )}

      {subItem && (
        <StyledIcon>
          <StyledDotIcon active={active && subItem} />
        </StyledIcon>
      )}

      <ListItemText
        primary={title}
        secondary={
          caption && (
            <Tooltip title={caption} placement="top-start">
              <span>{caption}</span>
            </Tooltip>
          )
        }
        primaryTypographyProps={{
          noWrap: true,
          component: 'span',
          variant: active ? 'subtitle2' : 'body2',
          color: active && depth === 1 ? '#447EEB' : '#525F81',
        }}
        secondaryTypographyProps={{
          noWrap: true,
          variant: 'caption',
        }}
      />

      {info && (
        <Box component="span" sx={{ lineHeight: 0 }}>
          {info}
        </Box>
      )}

      {!!children && (
        <Iconify
          width={16}
          icon={
            open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'
          }
          sx={{ ml: 1, flexShrink: 0 }}
        />
      )}
    </StyledItem>
  );

  const renderItem = () => {
    // ExternalLink
    if (isExternalLink)
      return (
        <Link href={path} target="_blank" rel="noopener" underline="none">
          {renderContent}
        </Link>
      );

    // Has child
    if (children) {
      return renderContent;
    }

    // Default
    return (
      <Link component={RouterLink} to={path} underline="none">
        {renderContent}
      </Link>
    );
  };

  //   return <RoleBasedGuard roles={roles}> {renderItem()} </RoleBasedGuard>;
  return renderItem();
}
