import React from 'react';
import Stack from '@mui/material/Stack';
import ReactEcharts from 'libs/echarts-next';
import pieChart from 'components/Recaps/config/pieChart';
import { DigitalShelfAvgRecapCardType } from 'components/Recaps/utils/types';
import RecapValue from 'components/Recaps/components/RecapValue/RecapValue';
import BaseRecapCard from 'components/Recaps/components/BaseRecapCard/BaseRecapCard';

const DigitalShelfAvgRecapCard: React.FC<DigitalShelfAvgRecapCardType> = ({
  name,
  showPieChart = true,
  value,
  sx,
}) => {
  const chartValue = Number(String(value).replace('%', ''));

  return (
    <BaseRecapCard name={name} sx={sx}>
      <Stack direction="row" alignItems="center" sx={{ padding: '0 16px' }}>
        {showPieChart ? (
          <div style={{ marginRight: '10px' }}>
            <ReactEcharts
              option={{
                ...pieChart,
                series: [
                  {
                    ...(pieChart.series[0] as any),
                    data: [
                      { value: chartValue, selected: true },
                      { value: 100 - chartValue },
                    ],
                  },
                ],
              }}
              height={70}
              width={70}
              wrapperWidth={70}
              wrapperHeight={70}
            />
          </div>
        ) : null}
        <RecapValue value={value} marginTop={0} />
      </Stack>
    </BaseRecapCard>
  );
};

export default DigitalShelfAvgRecapCard;
