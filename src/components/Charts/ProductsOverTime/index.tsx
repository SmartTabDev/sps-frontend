import React from "react";
import ReactEcharts from 'libs/echarts-next';
import getOption from "./getOption";
import { TotalsOverTime } from "reducers/productAvailability";

const ProductsOverTime: React.FC<TotalsOverTime> = (props) => (
  <ReactEcharts option={getOption(props)} style={{width: '100%'}}/>
);

export default ProductsOverTime;
