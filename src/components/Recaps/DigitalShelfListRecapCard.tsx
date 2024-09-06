import React from 'react';
import { DigitalShelfListRecapCardType } from 'components/Recaps/utils/types';
import RecapValues from 'components/Recaps/components/RecapValues/RecapValues';
import BaseRecapCard from 'components/Recaps/components/BaseRecapCard/BaseRecapCard';
import { Stack, styled } from '@mui/system';
import { Typography } from '@mui/material';

const Name = styled(Typography)`
  font-weight: 400;
  font-size: 14px;
`;

const DigitalShelfListRecapCard: React.FC<DigitalShelfListRecapCardType> = ({
  color = '#447EEB',
  name,
  values,
  sx,
}) => {
  return (
    <BaseRecapCard name={name} sx={sx}>
      <Stack sx={{ padding: '0 16px' }}>
        <RecapValues values={values} color={color} Name={Name} />
      </Stack>
    </BaseRecapCard>
  );
};

export default DigitalShelfListRecapCard;
