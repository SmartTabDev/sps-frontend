import groupBy from 'lodash/groupBy';
import { initialRating, Rating } from 'reducers/ratingAndReviews/ratingAndReviews';
import reduceRatingCount from './reduceRatingCount';

const getGroupedRatings = (
  data: { count: number; roundrating: number }[],
  groupByKey: string,
  keyFormatter: (key: string) => string = (key) => key,
): { [x: string]: Rating } => {
  const groupedData = groupBy(data, groupByKey);

  const ratings = Object.entries(groupedData)
    .map(([key, ratings2]) => ({
      [keyFormatter(key)]: ratings2.reduce(reduceRatingCount, initialRating),
    }))
    .reduce((acc, current) => ({ ...acc, ...current }), {});

  return ratings;
};

export default getGroupedRatings;
