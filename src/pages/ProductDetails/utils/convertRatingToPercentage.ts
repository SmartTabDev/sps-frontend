const MAX_RATING = 5;

export const convertRatingToPercentage = (rating: number): number => {
  return (rating / MAX_RATING) * 100;
};
