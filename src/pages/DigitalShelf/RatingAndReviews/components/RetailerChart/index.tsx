import React, { useEffect, useState } from 'react';
import { RatingOverTime } from 'components/Charts/Rating';
import { useSelector } from 'react-redux';
import { UnifyCard, UnifyCardTitle } from 'components/UnifyCard/UnifyCard';

export const RetailerChart: React.FC = () => {
  const [ratingCols, setRatingCols] = useState<number[][]>([]);
  const [retailers, setRetailers] = useState<string[]>([]);
  const { ratingsLoading, ratingsPerRetailer } = useSelector(
    (state: RootState) => state.ratingAndReviews
  );

  useEffect(() => {
    if (ratingsPerRetailer) {
      const values = Object.values(ratingsPerRetailer);

      if (values.length > 0) {
        setRatingCols([
          values.map((rating) => rating[1]),
          values.map((rating) => rating[2]),
          values.map((rating) => rating[3]),
          values.map((rating) => rating[4]),
          values.map((rating) => rating[5]),
        ]);
        setRetailers(Object.keys(ratingsPerRetailer));
      }
    }
  }, [ratingsLoading, ratingsPerRetailer]);

  return (
    <UnifyCard>
      <UnifyCardTitle>ratings per retailer</UnifyCardTitle>
      <RatingOverTime
        data={ratingCols}
        XAxisData={retailers}
        isLoading={ratingsLoading}
      />
    </UnifyCard>
  );
};
