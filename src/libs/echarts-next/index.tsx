/* eslint-disable */
import React, {
  CSSProperties,
  FC, useCallback, useEffect, useRef, useState,
} from 'react';
import {
  EChartsOption, dispose, getInstanceByDom, init,
} from 'echarts';
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import { bind, clear } from 'size-sensor';
import { useMount, useUnmount } from 'react-use';

export type EChartsNextForReactCoreProps = {
  option: EChartsOption;
  notMerge?: boolean;
  replaceMerge?: string | string[];
  lazyUpdate?: boolean;
  silent?: boolean;
  style?: React.CSSProperties;
  className?: string;
  theme?: string | Record<string, unknown>;
  opts?: {
    renderer?: 'canvas' | 'svg';
    devicePixelRatio?: number;
    width?: number;
    height?: number;
    locale?: string | any;
  };
  showLoading?: boolean;
  onChartReady?: (arg0: any) => void;
  onEvents?: Record<string, unknown>;
  renderLegend?: (echarts?: echarts.ECharts) => JSX.Element;
  Title?: React.ComponentType<any>;
  legendOrder?: number | string;
  height?: number;
  width?: number | string;
  wrapperWidth?: number | string;
  wrapperHeight?: number | string;
  onChangeInstance?: (instance: echarts.ECharts | null) => void;
};

const EChartsNextForReactCore: FC<EChartsNextForReactCoreProps> = (props) => {
  const {
    style,
    className,
    theme,
    opts,
    option,
    notMerge,
    lazyUpdate,
    showLoading,
    onChartReady,
    onEvents,
    renderLegend,
    Title,
    legendOrder = 'initial',
    height = 360,
    wrapperWidth = '100%',
    wrapperHeight = '100%',
    onChangeInstance,
  } = props;
  const chartRefElements = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<echarts.ECharts | null>(null);

  const getChartInstance = () => {
    if (chartRefElements?.current) {
      return (
        getInstanceByDom(chartRefElements?.current)
        ?? init(chartRefElements?.current, theme, opts)
      );
    }
    return undefined;
  };

  const getChartDom = () => {
    const chartObj = getChartInstance();
    if (chartObj) {
      onChangeInstance && onChangeInstance(chartObj);
      setChart(chartObj);
      chartObj.setOption((option as any), notMerge ?? false, !!lazyUpdate ?? false);
      if (showLoading) {
        chartObj.showLoading();
      } else {
        chartObj.hideLoading();
      }
      return chartObj;
    }
    return undefined;
  };

  const bindEvents = () => {
    const chartElms = getChartDom();
    if (!isEmpty(onEvents) && chartElms) {
      // @ts-ignore
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, func] of Object.entries(onEvents)) {
        if (
          Object.prototype.hasOwnProperty.call(onEvents, key)
          && isString(key)
          && isFunction(func)
        ) {
          chartElms.on(key, (param: any) => {
            func(param, chartElms);
          });
        }
      }
    }
  };

  const renderChart = () => {
    const chartObj = getChartDom();
    bindEvents();
    if (chartObj) {
      if (isFunction(onChartReady)) {
        onChartReady(chartObj);
      } else if (chartRefElements) {
        bind(chartRefElements?.current, () => {
          try {
            chartObj?.resize();
          } catch (e) {
            console.error(e);
          }
        });
      }
    }
  };

  const disposeCurrentChart = () => {
    if (chartRefElements?.current) {
      clear(chartRefElements?.current);
      dispose(chartRefElements?.current);
    }
  };

  useMount(() => {
    renderChart();
  });

  useEffect(() => {
    disposeCurrentChart();
    renderChart();
  }, [theme, opts, onEvents]);

  useEffect(() => {
    const chartDom = getChartDom();
    // @ts-ignore
    if (chartDom?._dom) {
      // @ts-ignore
      bind(chartDom._dom, () => {
        try {
          chartDom?.resize();
        } catch (e) {
          console.error(e);
        }
      });
    }
  }, [style, className, showLoading]);

  useUnmount(() => {
    disposeCurrentChart();
  });

  const Legend = useCallback(() => {
    if (chart && renderLegend) {
      return renderLegend(chart);
    }

    return <></>;
  }, [chart, renderLegend]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: wrapperWidth || 'initial',
      height: wrapperHeight || 'initial',
    }}
    >
      {Title ? <Title /> : null}
      <div style={{ order: legendOrder } as CSSProperties}><Legend /></div>
      <div
        ref={chartRefElements}
        style={{
          height,
          ...style,
        }}
        className={classNames('echarts-next-for-react', className)}
      />
    </div>
  );
};

EChartsNextForReactCore.defaultProps = {
  notMerge: false,
  lazyUpdate: false,
  showLoading: false,
  height: 360,
  wrapperWidth: '100%',
  wrapperHeight: '100%',
};

export default EChartsNextForReactCore;
