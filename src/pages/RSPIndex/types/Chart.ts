export type ChartData = {
  data: {
    value: number;
    min: number;
    max: number;
  }[];
  name: string;
};

export type RSPIndexItem = {
  retailer: string;
  min: number;
  max: number;
  avg: number;
  runtime: string;
  date: string;
};
