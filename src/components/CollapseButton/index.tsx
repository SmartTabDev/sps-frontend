import React from 'react';
import { styled } from '@mui/system';
import Link, { LinkProps } from '@mui/material/Link';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const StyledLink = styled((props: LinkProps) => <Link {...props} />)<LinkProps>`
  font-weight: bold;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }

  svg {
    font-size: 13px;
    margin-left: 4px;
  }
`;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

const CollapseButton: React.FC<Props> = ({ isOpen, onClose, onOpen }) => (
  <div>
    {isOpen ? (
      <StyledLink onClick={onClose}>
        Close history <ArrowUpwardIcon />
      </StyledLink>
    ) : (
      <StyledLink onClick={onOpen}>
        {' '}
        View history <ArrowDownwardIcon />
      </StyledLink>
    )}
  </div>
);

export default CollapseButton;
