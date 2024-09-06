import { EChartsOption, SeriesOption } from 'echarts';
import moment from 'moment';
import {
  getYAxisMaxValue,
  getYAxisMinValue,
} from 'pages/SPS/utils/chart/getYAxisValue';

type ChangeOverTimeOption = {
  series: SeriesOption[];
  XAxisData: string[];
  legendData?: any;
  isLinesGrouped?: boolean;
};

const getTooltipHTML = (value: any, seriesName: string, group?: string) => {
  return `
  <span style="color: #525F81;">
    <span style="font-weight:bold">
        ${group ? `${group}<br />` : ''}
        <span style="${group ? 'font-size: 11px' : ''}">
        ${seriesName ? `${seriesName}<br />` : ''}
        </span>
    </span>
  ${String(value)}
  </span>`;
};

const getOption = (optionArgs: ChangeOverTimeOption): EChartsOption => {
  const { XAxisData, legendData, isLinesGrouped, series } = optionArgs;
  const groupLHeight = 9;
  const optionLHeight = 16;
  const legendsSpacing = 24;
  const groupLSpacing = 32;

  return {
    tooltip: {
      borderWidth: 0,
      trigger: 'item',
      formatter(params: any) {
        const { value, seriesName, seriesIndex } = params;
        const seriesData:
          | (SeriesOption & {
              group?: string;
            })
          | undefined = series[seriesIndex];
        return getTooltipHTML(value, seriesName, seriesData?.group);
      },
    },
    legend: !legendData
      ? { show: false }
      : {
          type: 'scroll',
          data: legendData,
          bottom: 0,
          align: 'left',
          left: '1%',
          icon: 'square',
          textStyle: {
            color: '#525F81',
          },
        },
    grid: {
      left: '2%',
      right: '2%',
      bottom: !legendData
        ? 0
        : `${
            optionLHeight +
            legendsSpacing +
            (isLinesGrouped ? groupLHeight + groupLSpacing : 0)
          }px`,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLabel: {
        formatter(value) {
          if (!value) {
            return '';
          }

          const weekNumber = moment(value).week();
          const year = moment(value).year();
          const showYear = weekNumber === 1;
          const weekNumberExtended = `${weekNumber}\n\n ${year}`;

          if (showYear) return weekNumberExtended;

          return String(weekNumber);
        },
      },
      data: XAxisData,
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      min: getYAxisMinValue,
      max: getYAxisMaxValue,
      axisLabel: {
        show: false,
      },
    },
    series,
  };
};

export default getOption;
