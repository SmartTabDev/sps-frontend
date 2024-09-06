import React from 'react';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';

type LabelProps = {
  [key: string]: any;
  customColor: string;
  ratingCount: number;
};

const StyledTypography = styled(Typography, {
  shouldForwardProp: (props) => props !== '$customColor',
})<{ $customColor: string }>`
  color: ${({ $customColor }) => $customColor};
  font-size: 16px;
  font-weight: bold;
`;

export const Label: React.FC<LabelProps> = ({ ratingCount, customColor }) => (
  <StyledTypography variant="subtitle2" gutterBottom $customColor={customColor}>
    {ratingCount}
  </StyledTypography>
);
