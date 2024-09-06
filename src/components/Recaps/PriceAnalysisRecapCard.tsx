import React, { useMemo } from 'react';
import Stack from '@mui/material/Stack';
import { PriceAnalysisRecapCardType } from 'components/Recaps/utils/types';
import SingleRecapValue from 'components/Recaps/components/RecapValue/RecapValue';
import Subtitle from 'components/Recaps/components/Subtitle/Subtitle';
import BaseRecapCard from 'components/Recaps/components/BaseRecapCard/BaseRecapCard';
import { Box, styled } from '@mui/system';
import Chart from 'react-apexcharts';
import fillSeries from 'components/Recaps/utils/fillSeries';
import intervalsChart from 'components/Recaps/config/intervalsChart';

export const ChartWrapper = styled('div')`
  position: absolute;
  right: 6px;
  bottom: -37px;
`;

const PriceAnalysisRecapCard: React.FC<PriceAnalysisRecapCardType> = ({
  color = '#447EEB',
  name,
  positive,
  series,
  subtitle,
  value,
  sx,
}) => {
  const chartOptions = useMemo(
    () => ({
      ...intervalsChart,
      colors: [color],
    }),
    [color]
  );

  const chartSeries = useMemo(() => fillSeries(series), [series?.length]);

  return (
    <BaseRecapCard name={name} sx={sx}>
      <Box>
        <Subtitle
          color={color}
          positive={positive}
          subtitle={subtitle}
          percentage
        />
      </Box>
      <Stack
        direction="row"
        alignItems="baseline"
        justifyContent="space-between"
        sx={{ padding: '0 16px' }}
      >
        <SingleRecapValue value={value} />
        <ChartWrapper>
          <Chart
            height="110px"
            options={chartOptions}
            series={chartSeries}
            type="bar"
            width="140px"
          />
        </ChartWrapper>
      </Stack>
    </BaseRecapCard>
  );
};

export default PriceAnalysisRecapCard;
