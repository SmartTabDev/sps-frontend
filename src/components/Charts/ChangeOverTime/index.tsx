import React from 'react';
import ReactEcharts from 'libs/echarts-next';
import { SeriesOption } from 'echarts';
import { FullWidthLinearLoader } from 'components/LinearLoader';
import {
  ChangeOverTimeSeriesInput,
  GroupedChartData,
} from 'pages/OfflineAvailability/types/Chart';
// import getRandomColor from 'utils/colors/getRandomColor';
import getOption from './getOption';
import GroupLegend from './GroupLegend';

const getLineSymbol = (groups: string[], group: string) => {
  const symbols = ['circle', 'rect', 'diamond', 'triangle', 'diamond'];

  if (!groups.includes(group)) groups.push(group);

  const symbol = symbols[groups.indexOf(group)];
  if (symbol !== undefined) return symbol;

  return '';
};

type ChangeOverTimeProps = {
  data: ChangeOverTimeSeriesInput;
  XAxisData: string[];
  isLoading?: boolean;
  legendData?: any;
  isLinesGrouped?: boolean;
  minHeight?: string;
};

const ChangeOverTime: React.FC<ChangeOverTimeProps> = ({
  isLinesGrouped,
  XAxisData,
  isLoading = true,
  data,
  legendData,
  minHeight = '550px',
}) => {
  const groups: string[] = [];

  const createSeries = (): SeriesOption[] => {
    const series = (data as GroupedChartData[]).map(
      ({ data: seriesData, group, name, color }) => ({
        symbol: isLinesGrouped ? getLineSymbol(groups, group) : 'circle',
        type: 'line' as const,
        symbolSize: 7,
        name,
        group,
        data: seriesData,
        itemStyle: {
          color,
        },
      })
    );

    return series;
  };

  return !isLoading ? (
    <div
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      <ReactEcharts
        style={{
          height: '100%',
          minHeight,
          width: '100%',
          marginBottom: '20px',
        }}
        option={getOption({
          isLinesGrouped,
          XAxisData,
          series: createSeries(),
          legendData,
        })}
        notMerge
      />
      {isLinesGrouped && (
        <GroupLegend
          data={groups.map((name, i) => ({
            name,
            symbol: getLineSymbol(groups, name),
          }))}
        />
      )}
    </div>
  ) : (
    <FullWidthLinearLoader width={300} text="Building your chart" />
  );
};

export default ChangeOverTime;
