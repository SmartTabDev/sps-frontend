import React from 'react';
import { OfflineAvailabilityRecapCardType } from 'components/Recaps/utils/types';
import RecapValue from 'components/Recaps/components/RecapValue/RecapValue';
import BaseRecapCard from 'components/Recaps/components/BaseRecapCard/BaseRecapCard';
import { Stack, styled } from '@mui/system';
import { Line } from 'components/Line/Line';
import { Typography } from '@mui/material';
import TrendValue from './components/TrendValue/TrendValue';
import RecapValues from './components/RecapValues/RecapValues';

const Name = styled(Typography)`
  font-weight: 500;
  font-size: 10px;
  color: #98afcf;
`;

const OfflineAvailabilityRecapCard: React.FC<
  OfflineAvailabilityRecapCardType
> = ({ color = '#447EEB', name, value, values, positive, subtitle, sx }) => {
  return (
    <BaseRecapCard
      name={name}
      sx={{
        ...sx,
        minHeight: 'initial',
      }}
    >
      <div>
        <Stack
          direction="row"
          alignItems="center"
          sx={{ padding: '0 16px' }}
          spacing="12px"
        >
          <RecapValue value={value} marginTop={0} />
          <TrendValue
            color={color}
            positive={positive}
            useIcon
            value={subtitle}
            bold
            size="medium"
            useTrendColor
          />
        </Stack>
        {values && values.length > 0 && (
          <>
            <Line height={1} background="#CDDAEB" margin="14px 0 6px 0" />
            <Stack
              direction="row"
              alignItems="center"
              sx={{ padding: '0 16px' }}
              spacing="12px"
            >
              <RecapValues
                values={values}
                namePosition="left"
                Name={Name}
                useTrendColor
              />
            </Stack>
          </>
        )}
      </div>
    </BaseRecapCard>
  );
};

export default OfflineAvailabilityRecapCard;
