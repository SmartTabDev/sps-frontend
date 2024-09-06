export enum EyeLevelChartPeriod {
  WEEKLY,
  MONTHLY,
  QUARTERLY,
}

export type EyeLevelChartDataType = {
  week: number;
  target: number;
  contentScore: number;
  closeTheGap: number;
};

export type EyeLevelTab = {
  label: string;
  id: EyeLevelChartPeriod;
};

export type EyeLevelRetailerSummaryData = {
  general: number;
  shelf: number;
  content: number;
  ratingAndReviews: number;
  searchVsFairShare: number;
};

type EyeLevelRetailerDataValue = {
  percent: number;
  change: number;
};

export type EyeLevelRetailerData = {
  name: string;
  general: {
    avg: EyeLevelRetailerDataValue;
  };
  shelf: {
    avg: EyeLevelRetailerDataValue;
    available: EyeLevelRetailerDataValue;
    listed: EyeLevelRetailerDataValue;
    outOfStock: EyeLevelRetailerDataValue;
  };
  content: {
    avg: EyeLevelRetailerDataValue;
    pShotMatch: EyeLevelRetailerDataValue;
    images: EyeLevelRetailerDataValue;
    bullets: EyeLevelRetailerDataValue;
    richContent: EyeLevelRetailerDataValue;
  };
  ratingAndReviews: {
    avg: EyeLevelRetailerDataValue;
    rAndR: EyeLevelRetailerDataValue;
    rating: EyeLevelRetailerDataValue;
    reviews: EyeLevelRetailerDataValue;
  };
  search: {
    avg: EyeLevelRetailerDataValue;
    searchVsFairShare: EyeLevelRetailerDataValue;
  };
};

type ThresholdProperties = {
  to: number;
  from: number;
  label: string;
};

export type EyeLevelThresholds = {
  high: ThresholdProperties;
  mid: ThresholdProperties;
  low: ThresholdProperties;
};

export type EyeLevelThresholdsConfigKey =
  | 'general'
  | 'shelf'
  | 'content'
  | 'ratings-and-reviews'
  | 'search';

export type EyeLevelThresholdsConfig = {
  general: {
    avg: EyeLevelThresholds;
  };
  shelf: {
    available: EyeLevelThresholds;
    listed: EyeLevelThresholds;
    'out-of-stock': EyeLevelThresholds;
  };
  content: {
    avg: EyeLevelThresholds;
    'packshot-match': EyeLevelThresholds;
    'num-images': EyeLevelThresholds;
    bullets: EyeLevelThresholds;
    'rich-content': EyeLevelThresholds;
  };
  'ratings-and-reviews': {
    'ratings-and-reviews': EyeLevelThresholds;
    ratings: EyeLevelThresholds;
    reviews: EyeLevelThresholds;
  };
  search: {
    'search-fair-trade': EyeLevelThresholds;
  };
};
