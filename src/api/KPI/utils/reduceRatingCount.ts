import { Rating } from 'reducers/ratingAndReviews/ratingAndReviews';

const reduceRatingCount = (
  acc: Rating,
  { count, roundrating }: any,
): Rating => ({
  ...acc,
  [roundrating]: count,
});

export default reduceRatingCount;
