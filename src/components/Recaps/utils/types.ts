import { SxProps } from '@mui/system';

export type CardSeries = { name: string; data: number[] };

export type RecapCardValues = {
  name: string;
  value: string;
  positive?: boolean;
  trendValue?: number;
};

export type BaseRecapCardType = {
  name: string;
  sx?: SxProps;
};

export type RecapCardType = {
  color?: string | undefined;
  positive?: boolean;
  value?: string | number;
  values?: RecapCardValues[];
  subtitle?: string | number;
  series?: CardSeries[];
  showPieChart?: boolean;
} & BaseRecapCardType;

export type PriceAnalysisRecapCardType = Pick<
  RecapCardType,
  'color' | 'name' | 'positive' | 'series' | 'subtitle' | 'value' | 'sx'
>;

export type DigitalShelfListRecapCardType = Pick<
  RecapCardType,
  'color' | 'name' | 'values' | 'sx'
>;

export type DigitalShelfAvgRecapCardType = Omit<
  RecapCardType,
  'color' | 'positive' | 'series' | 'subtitle' | 'values'
>;

export type OfflineAvailabilityRecapCardType = Pick<
  RecapCardType,
  'color' | 'name' | 'positive' | 'subtitle' | 'value' | 'values' | 'sx'
>;
