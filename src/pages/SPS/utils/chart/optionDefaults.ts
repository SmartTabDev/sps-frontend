import { EChartOption } from 'echarts';
import formatPrice from 'utils/formatPrice';
import { getYAxisMinValue, getYAxisMaxValue } from './getYAxisValue';
import tooltipFormatter from './tooltipFormatter';

const optionDefaults: EChartOption<EChartOption.SeriesLine> = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      label: {
        formatter: tooltipFormatter,
      },
    },
  },
  legend: {
    show: false,
  },
  grid: {
    left: '2%',
    right: '2%',
    bottom: '15%',
    containLabel: true,
  },
  xAxis: {
    axisLabel: {
      color: '#4F4F4F',
      rotate: 45,
      rich: {
        time: {
          fontWeight: 'bold',
        },
      },
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      lineStyle: {
        width: 0,
      },
    },
  },
  yAxis: {
    type: 'value',
    // boundaryGap: ['20%', '20%'],
    min: getYAxisMinValue,
    max: getYAxisMaxValue,
    axisLabel: {
      color: '#4F4F4F',
      formatter(value: any): number | string {
        if (value < 0) return '';
        return formatPrice(value);
      },
    },
    splitLine: {
      lineStyle: {
        color: '#E0E0E0',
      },
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      lineStyle: {
        width: 0,
      },
    },
    splitNumber: 5,
  },
};

export default optionDefaults;
