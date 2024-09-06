import { WeekData } from './types';

export const convertWeekDataToRadarItemData = ({
  availability,
  contentScore,
  ratings,
  reviews,
  rspIndex,
  timeInPromotion,
}: WeekData): number[] => {
  return [
    availability,
    rspIndex,
    ratings,
    reviews,
    contentScore,
    timeInPromotion,
  ];
};
