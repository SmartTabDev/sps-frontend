import React from 'react';
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/system';
import * as MDIcons from 'react-icons/md';
import * as FAIcons from 'react-icons/fa';

const Icons = { ...MDIcons, ...FAIcons };

export type TextButtonProps = {
  icon?: keyof typeof Icons;
  [key: string]: any;
};

const StyledButton = styled(ButtonBase)<TextButtonProps>`
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 14px;
  line-height: 16px;
  font-style: normal;
  font-weight: bold;
  padding: 0;
  white-space: nowrap;

  svg {
    padding-right: 6px;
    font-size: 20px;
  }

  &:active {
    color: ${({ theme }) => theme.palette.blueGrey[400]};
  }

  &:disabled {
    color: ${({ theme }) => theme.palette.grey[400]};
  }
`;

const TextButton: React.FC<TextButtonProps> = ({ children, icon, ...props }) => {
  const IconTag = icon ? Icons[icon] : null;
  return (
    <StyledButton disableRipple {...props}>
      {IconTag && <IconTag />}
      {' '}
      {children}
    </StyledButton>
  );
};

export default TextButton;
