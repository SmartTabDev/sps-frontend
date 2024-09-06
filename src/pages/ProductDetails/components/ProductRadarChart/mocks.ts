import { ProductRadarChartData } from './types';

export const totalReviewsMock = 123;

export const productRadarChartDataMock: ProductRadarChartData = {
  previousWeek: {
    availability: 2,
    timeInPromotion: 7,
    contentScore: 95,
    reviews: 50,
    ratings: 2,
    rspIndex: 120,
  },
  currentWeek: {
    availability: 6,
    timeInPromotion: 6,
    contentScore: 90,
    reviews: 100,
    ratings: 4,
    rspIndex: 180,
  },
};
