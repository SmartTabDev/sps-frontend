import React from 'react';
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/system';

export type ButtonProps = {
  size: 'large' | 'medium' | 'small';
  [key: string]: any;
};

const StyledButtonBase = styled(ButtonBase)<ButtonProps>`
  box-shadow: 0px 4px 9px rgba(82, 95, 129, 0.35);
  border-radius: 30px;
  background: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.grey[100]};
  font-style: normal;
  font-weight: bold;
  text-align: center;

  &:hover {
    box-shadow: 0px 6px 11px rgba(82, 95, 129, 0.37);
  }

  &:active {
    box-shadow: inset 0px 4px 9px rgba(82, 95, 129, 0.55);
  }

  &:disabled {
    background: ${({ theme }) => theme.palette.grey[400]};
    box-shadow: none;
  }

  ${({ size }) => size === 'large'
    && `
      width: 347px;
      height: 53px;
      font-size: 18px;
      line-height: 21px;
    `}

  ${({ size }) => size === 'medium'
    && `
      width: 150px;
      height: 46px;
      font-size: 14px;
      line-height: 16px;
    `}


    ${({ size }) => size === 'small'
      && `
      width: 90px;
      height: 35px;
      font-size: 12px;
      line-height: 14px;
    `}
`;

const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <StyledButtonBase disableRipple {...props}>
    {children}
  </StyledButtonBase>
);

export default Button;
