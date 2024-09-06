import React, { useEffect, useState } from 'react';
import { RatingOverTime } from 'components/Charts/Rating';
import PanelTitle from 'components/PanelTitle';
import { useSelector } from 'react-redux';
import { UnifyCard, UnifyCardTitle } from 'components/UnifyCard/UnifyCard';

export const DailyChart: React.FC = () => {
  const [ratingCols, setRatingCols] = useState<number[][]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const { ratingsLoading, ratingsOverTime } = useSelector(
    (state: RootState) => state.ratingAndReviews
  );

  useEffect(() => {
    const values = Object.values(ratingsOverTime);

    if (values.length > 0) {
      setRatingCols([
        values.map((rating) => rating[1]),
        values.map((rating) => rating[2]),
        values.map((rating) => rating[3]),
        values.map((rating) => rating[4]),
        values.map((rating) => rating[5]),
      ]);
      setDates(Object.keys(ratingsOverTime));
    }
  }, [ratingsLoading, ratingsOverTime]);

  return (
    <UnifyCard>
      <UnifyCardTitle>ratings over time</UnifyCardTitle>
      <RatingOverTime
        data={ratingCols}
        XAxisData={dates}
        isLoading={ratingsLoading}
      />
    </UnifyCard>
  );
};
