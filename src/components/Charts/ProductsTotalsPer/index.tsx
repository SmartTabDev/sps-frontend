import React from 'react';
import ReactEcharts from 'libs/echarts-next';
import { FullWidthLinearLoader } from 'components/LinearLoader';
import getOption from './getOption';
import { TotalsPer } from 'reducers/productAvailability';

const ProductsOverTime: React.FC<TotalsPer> = (props) =>
  props ? (
    <ReactEcharts style={{ height: '100%', width: '100%' }} option={getOption(props)} />
  ) : (
    <FullWidthLinearLoader width={300} text='Building your chart' />
  );

export default ProductsOverTime;
