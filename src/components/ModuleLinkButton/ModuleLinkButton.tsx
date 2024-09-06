/* eslint-disable react/jsx-props-no-spreading */
import East from '@mui/icons-material/East';
import { IconButton } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

const StyledEast = styled(East)`
  font-size: 18px;
  color: ${({ theme }) => theme.palette.blueGrey[400]};
`;

const ModuleLinkButton = (props: LinkProps) => {
  return (
    <Link {...props}>
      <IconButton>
        <StyledEast />
      </IconButton>
    </Link>
  );
};

export default ModuleLinkButton;
