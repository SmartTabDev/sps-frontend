import {
  TRENDING_UP_COLOR,
  TRENDING_DOWN_COLOR,
  NO_CHANGE_COLOR,
} from './getTrendColor';

export const getTrendColorByData = (data: number): string => {
  if (data > 0) return TRENDING_UP_COLOR;
  if (data < 0) return TRENDING_DOWN_COLOR;
  return NO_CHANGE_COLOR;
};
