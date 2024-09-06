import { EChartOption } from 'echarts';

export type OptionProps = {
  xAxis: EChartOption.XAxis;
  series: EChartOption.SeriesLine[];
  legend: EChartOption.Legend;
  colors: string[];
};
