import React from 'react';
import ReactEcharts from 'libs/echarts-next';
import { EChartsOption } from 'echarts';

type Props = {
  style: React.CSSProperties;
  option: EChartsOption;
  onChangeInstance?: (instance: echarts.ECharts | null) => void;
};

export const BarLineChart: React.FC<Props> = ({
  style,
  option,
  onChangeInstance,
}) => {
  return (
    <ReactEcharts
      style={style}
      option={option}
      onChangeInstance={onChangeInstance}
    />
  );
};
