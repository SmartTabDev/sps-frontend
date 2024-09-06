import { EChartsOption } from 'echarts';

export type OptionIndicator = {
  name: string;
  max: number;
};

export type OptionItem = {
  name: string;
  data: number[];
};

export type AdditionalOptions = {
  legend?: EChartsOption['legend'];
  radar?: EChartsOption['radar'];
  tooltip?: EChartsOption['tooltip'];
};

// example of chart: https://echarts.apache.org/examples/en/editor.html?c=radar

export const getRadarChart = (
  data: OptionItem[],
  optionIndicator: OptionIndicator[],
  additionalOptions?: AdditionalOptions
): EChartsOption => {
  const indicator = optionIndicator.map((r) => ({
    name: r.name,
    max: r.max,
    axisType: 'value' as const,
  }));

  const legendData = data.map((i) => i.name);
  const seriesData = data.map((i) => ({ name: i.name, value: i.data }));

  const additionalLegendOptions = additionalOptions?.legend || {};
  const additionalRadarOptions = additionalOptions?.radar || {};
  const additionalTooltipOptions = additionalOptions?.tooltip || {};

  return {
    tooltip: {
      ...additionalTooltipOptions,
    },
    legend: {
      data: legendData,
      type: 'scroll',
      orient: 'vertical',
      right: '10%',
      top: '12%',
      bottom: 20,
      itemWidth: 10,
      itemHeight: 10,
      icon: 'rect',
      ...additionalLegendOptions,
    },
    radar: {
      indicator,
      ...additionalRadarOptions,
    },
    series: [
      {
        symbol: 'none',
        type: 'radar',
        data: seriesData,
      },
    ],
  };
};
