export interface WeekData {
  availability: number;
  timeInPromotion: number;
  contentScore: number;
  reviews: number;
  ratings: number;
  rspIndex: number;
}

export interface ProductRadarChartData {
  previousWeek: WeekData;
  currentWeek: WeekData;
}
