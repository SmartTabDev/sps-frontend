import React from 'react';
import { BaseRecapCardType } from 'components/Recaps/utils/types';
import { Box, styled } from '@mui/system';
import { Card, Typography } from '@mui/material';

const StyledCard = styled(Card)`
  border-radius: 10px;
  width: 100%;
  height: auto;
  max-width: 400px;
  box-shadow: 0px 4px 16px 0px #00000026, 0px -2px 0px 0px #00000005;
  position: relative;
  padding-bottom: 12px;
  min-height: 126px;
`;

const Title = styled(Typography)`
  font-size: 16px;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  margin-block-start: 0px;
  margin-block-end: 0px;
  padding-bottom: 3px;
  font-weight: 400;
  padding: 16px 16px 12px 16px;
  line-height: 1;
`;

const BaseRecapCard: React.FC<BaseRecapCardType> = ({ children, name, sx }) => {
  return (
    <StyledCard sx={sx}>
      <Box>
        <Title>{name}</Title>
      </Box>
      {children}
    </StyledCard>
  );
};

export default BaseRecapCard;
