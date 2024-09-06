import Typography from '@mui/material/Typography';
import React from 'react';
import { styled } from '@mui/system';
import { formatPercentage } from 'utils/formatPercentage';

type Props = {
  value: number;
};

const AvgShareWrapper = styled('div')`
  color: ${({ theme }) => theme.palette.secondary.dark};
  position: relative;
  text-align: center;
  max-width: 250px;
`;

const StyledTypography = styled(Typography)`
  font-size: 80px;
  line-height: 80px;
  font-family: Lato;
  font-style: normal;
  font-weight: 300;
`;

const AvgShare: React.FC<Props> = ({ value }) => (
  <AvgShareWrapper>
    <StyledTypography>{formatPercentage(value)}</StyledTypography>
  </AvgShareWrapper>
);

export default AvgShare;
