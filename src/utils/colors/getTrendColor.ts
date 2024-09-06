export const TRENDING_UP_COLOR = '#28A745';
export const TRENDING_DOWN_COLOR = '#EB5757';
export const NO_CHANGE_COLOR = '#828282';

export enum Trend {
  UP = 'UP',
  DOWN = 'DOWN',
  NO_CHANGE = 'NO_CHANGE',
}

export const getTrendColor = (trend: Trend): string => {
  switch (trend) {
    case Trend.UP:
      return TRENDING_UP_COLOR;
    case Trend.DOWN:
      return TRENDING_DOWN_COLOR;
    case Trend.NO_CHANGE:
      return NO_CHANGE_COLOR;
    default:
      return NO_CHANGE_COLOR;
  }
};
