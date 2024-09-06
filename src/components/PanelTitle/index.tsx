import React from 'react';
import Typography from '@mui/material/Typography';
import { styled, css } from '@mui/system';

type Props = {
  size?: 'big' | 'small';
  underlined?: boolean;
  $noMargin?: boolean;
};

const StyledTypography = styled(Typography, {
  shouldForwardProp: (props) =>
    props !== 'underlined' && props !== '$noMargin' && props !== 'size',
})<Props>`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.blueGrey[400]};
  text-transform: uppercase;
  letter-spacing: 1px;

  ${(props) =>
    props.underlined &&
    css`
      &::after {
        display: block;
        content: '';
        width: 160px;
        margin-top: 13px;
        margin-bottom: 20px;
        border-bottom: 1px solid ${props.theme.palette.tableDivider.main};
      }
    `};

  ${({ size, theme }) =>
    size === 'big' &&
    css`
      font-size: 18px;
      color: ${theme.palette.blueGrey[400]};
      letter-spacing: 2px;
      margin-bottom: 20px;
    `};

  ${(props) =>
    props.$noMargin &&
    css`
      margin: 0;
    `};
`;

const PanelTitle: React.FC<Props> = ({ children, ...props }) => (
  <StyledTypography {...props}>{children}</StyledTypography>
);

export default PanelTitle;
