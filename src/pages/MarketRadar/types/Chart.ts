export type BrandData = {
  brand: string;
  value: number;
  runtime: string;
  weight?: number;
  date: string;
  retailer?: string;
};

export type ChartData = {
  data: number[];
  name: string;
};

export type RetailersMaxCount = {
  name: string;
  max?: number;
}[];
