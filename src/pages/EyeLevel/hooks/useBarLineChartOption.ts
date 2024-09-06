import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { graphic } from 'echarts';
import { useTimeoutFn } from 'react-use';
import { getChartBarWidth, getChartData } from '../components/Charts/helpers';
import { EyeLevelChartPeriod } from '../types';

const CHART_HEIGHT = 346;

export const useBarLineChartOption = (
  period?: EyeLevelChartPeriod,
  fromDate?: moment.Moment,
  toDate?: moment.Moment
): {
  isLoading: boolean;
  chartOption: echarts.EChartsOption | undefined;
} => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [chartOption, setChartOption] = useState<echarts.EChartsOption>();

  const getChartOption = useCallback(
    () => () => {
      const { category1, category2, categoryYear, lineData, barData } =
        getChartData(period);
      const dottedData = lineData.map(
        (e, index) => e - (barData?.[index] || 0)
      );
      const maxValue = Math.max(...lineData) * 1.1;
      const scale = CHART_HEIGHT / maxValue;

      // option
      const option: echarts.EChartsOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          valueFormatter: (value: number) => value.toFixed(0),
        },
        grid: {
          top: 0,
          left: 20,
          right: 20,
        },
        legend: {
          data: ['target'],
          formatter: 'Target',
          itemWidth: 20,
          itemHeight: 2,
          left: 20,
          bottom: -7,
          textStyle: {
            color: '#525F81',
            fontSize: 9,
            lineHeight: 14,
          },
        },
        xAxis: [
          {
            data: category1,
            offset: 10,
            axisLine: {
              lineStyle: {
                color: '#828282',
              },
            },
            axisLabel: {
              fontSize: 9,
              lineHeight: 1.5,
              color: (value: string) => {
                const labelId = category1.findIndex((label) => value === label);
                return categoryYear[labelId] === 0 ? '#5D81B4' : '#3B455E';
              },
            },
            axisTick: {
              show: false,
            },
          },
          ...(category2?.length
            ? [
                {
                  data: category2,
                  position: 'bottom',
                  offset: 34,
                  axisLine: {
                    show: false,
                  },
                  axisTick: {
                    show: false,
                  },
                  axisLabel: {
                    fontSize: 9,
                    lineHeight: 1.5,
                    color: (_: string, index: number) =>
                      index === 0 ? '#3B455E' : '#5D81B4',
                  },
                },
              ]
            : []),
        ],
        yAxis: {
          axisLabel: {
            show: false,
          },
          max: maxValue,
          interval: maxValue / 5,
        },
        series: [
          {
            name: 'target',
            type: 'line',
            smooth: true,
            symbol: 'none',
            itemStyle: {
              color: '#BB6BD9',
            },
            symbolSize: 0,
            data: lineData,
          },
          {
            name: 'content score',
            type: 'bar',
            barWidth: getChartBarWidth(barData.length),
            itemStyle: {
              borderRadius: 5,
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#56CCF2' },
                { offset: 1, color: '#447EEB' },
              ]),
            },
            data: barData,
          },
          {
            name: 'close the gap',
            type: 'pictorialBar',
            symbol: 'rect',
            itemStyle: {
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(86, 204, 242, 0.35)' },
                { offset: 0.1, color: 'rgba(86, 204, 242, 0.35)' },
                { offset: 1, color: 'rgba(86, 204, 242, 1)' },
              ]),
              opacity: 0.5,
            },
            symbolRepeat: true,
            symbolSize: [getChartBarWidth(barData.length), 3],
            symbolMargin: 1,
            z: -10,
            data: dottedData.map((value, index) => ({
              value,
              symbolOffset: [0, -(barData?.[index] || 0) * scale],
            })),
          },
        ],
      } as echarts.EChartsOption;
      return option;
    },
    [period]
  );

  const [, , resetTimeOut] = useTimeoutFn(() => {
    setIsLoading(false);
    setChartOption(getChartOption());
  }, 2000);

  useEffect(() => {
    setIsLoading(true);
    resetTimeOut();
  }, [period, fromDate, toDate, resetTimeOut]);

  return { chartOption, isLoading };
};
