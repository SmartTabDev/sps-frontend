export type ChartData = {
  data: {
    value: number;
  }[];
  name: string;
  color: string;
};

export type GroupedChartData = {
  data: number[];
  name: string;
  group: string;
  color: string;
};

export type ChangeOverTimeSeriesInput = Array<ChartData | GroupedChartData>;

export type OAMItem = {
  retailer: string;
  category: string;
  subcategory: string;
  product_class: string;
  shop_class: string;
  value: number;
  date: string;
};
