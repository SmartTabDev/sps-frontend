import { RadarChart } from 'components/Charts/RadarChart';
import { UnifyCard } from 'components/UnifyCard/UnifyCard';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { ProductRadarChartData } from './types';
import { convertWeekDataToRadarItemData } from './utils';
import './tooltip-override.css';

interface ProductRadarChartProps {
  data: ProductRadarChartData;
  totalReviews: number;
  isLoading?: boolean;
}

const ProductRadarChart = ({
  data,
  totalReviews,
  isLoading,
}: ProductRadarChartProps) => {
  const { palette } = useTheme();
  const indicator = [
    { name: 'Availability', max: 7 },
    { name: 'RSP Index', max: 180 },
    { name: 'Ratings', max: 5 },
    { name: 'Reviews', max: totalReviews },
    { name: 'Content Score', max: 100 },
    { name: 'Time in \npromotion', max: 7 },
  ];

  const { currentWeek, previousWeek } = data;

  const items = [
    {
      name: 'Current week',
      data: convertWeekDataToRadarItemData(currentWeek),
    },
    {
      name: 'Previous week',
      data: convertWeekDataToRadarItemData(previousWeek),
    },
  ];

  return (
    <UnifyCard sx={{ width: '363px', height: '100%' }}>
      <RadarChart
        height="100%"
        items={items}
        indicator={indicator}
        isLoading={isLoading}
        loadingText="Loading data..."
        loaderWidth="80%"
        additionalOptions={{
          tooltip: { className: 'product-radar-chart-tooltip' },
          legend: {
            top: 0,
            right: 0,
            itemGap: 8,
            textStyle: {
              color: palette.text.primary,
              fontSize: '8px',
              fontWeight: 500,
              fontFamily: 'Lato, sans-serif',
            },
          },
          radar: {
            center: ['150px', '50%'],
            axisName: { color: palette.blueGrey[400] },
            axisLine: { lineStyle: { color: palette.tableDivider.main } },
            splitLine: { lineStyle: { color: palette.tableDivider.main } },
            splitArea: {
              areaStyle: {
                color: [palette.tableBackground.main, palette.common.white],
              },
            },
          },
        }}
      />
    </UnifyCard>
  );
};

export default ProductRadarChart;
