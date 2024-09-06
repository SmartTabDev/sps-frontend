import { EChartOption } from 'echarts';

export type OptionProps = {
  xAxis: EChartOption.XAxis;
  yAxis: EChartOption.YAxis;
  series: EChartOption.SeriesLine[];
  legend: EChartOption.Legend;
  colors: string[];
  dataZoom: EChartOption.DataZoom | EChartOption.DataZoom[] | undefined;
  grid: EChartOption.Grid;
  tooltip: EChartOption.Tooltip;
};
