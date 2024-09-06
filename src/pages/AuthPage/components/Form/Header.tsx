import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled, css } from '@mui/system';

const Wrapper = styled(Box, {
  shouldForwardProp: (props) => props !== '$error',
})<{ $error: boolean }>`
  margin-bottom: 55px;
  color: ${({ theme }) => theme.palette.blueGrey[400]};
  text-align: center;

  ${({ $error }) => $error
    && css`
      margin-bottom: 20px;
    `}
`;

const StyledBigText = styled(Typography)`
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 36px;
`;

interface SmallTextProps {
  $error: boolean;
}

const StyledSmallText = styled(Typography, {
  shouldForwardProp: (props) => props !== '$error',
})`
  font-family: Karla;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  margin-top: 10px;

  ${({ $error }: SmallTextProps) => $error
    && css`
      color: #f00f00;
    `}
`;

interface Props {
  title: string;
  subTitle: string;
  error?: string;
}

export function Header({ title, subTitle, error }: Props): JSX.Element {
  return (
    <Wrapper $error={!!error}>
      <StyledBigText variant="body1">{title}</StyledBigText>
      <StyledSmallText $error={!!error} variant="body1">
        {error || subTitle}
      </StyledSmallText>
    </Wrapper>
  );
}
