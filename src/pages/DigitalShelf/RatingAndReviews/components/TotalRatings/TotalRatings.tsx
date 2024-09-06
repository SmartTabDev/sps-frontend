/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Totals from 'components/Totals';
import { ColorConfig } from 'components/CustomRating';
import { useSelector } from 'react-redux';
import {
  initialRating,
  Rating,
} from 'reducers/ratingAndReviews/ratingAndReviews';
import { RatingStats } from './components/RatingStats/RatingStats';
import { RatingRow } from './components/RatingRow';
import { TotalRating } from './components/TotalRating';

type BoxColumnProps = {
  size: number;
  [key: string]: any;
};

const StyledBoxColumn = styled(Box)<BoxColumnProps>`
  width: ${(props) => props.size}%;
  text-align: center;
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 24px;
    margin-left: 15%;
    margin-right: 15%;
  }
`;

const BoxColumn: React.FC<BoxColumnProps> = ({ children, ...props }) => (
  <StyledBoxColumn {...props}>{children}</StyledBoxColumn>
);

const calcSum = (rating: Rating): number =>
  Object.entries(rating)
    // eslint-disable-next-line radix
    .map((el) => parseInt(el[0]) * el[1])
    .reduce((a, b) => a + b);

const getTotalRating = (sum: number, divider: number) =>
  sum > 0 && divider > 0 ? (sum / divider).toFixed(2) : '0.00';

type RatingRowsProps = {
  rating: Rating;
  divider: number;
  scaleFactor: number;
};

const RatingRows: React.FC<RatingRowsProps> = ({
  rating,
  divider,
  scaleFactor,
}) => (
  <>
    {Object.entries(rating)
      .reverse()
      .map(([ratingValue, ratingCount], index) => (
        <RatingRow
          key={index}
          customColor={ColorConfig[ratingValue]}
          ratingValue={ratingValue}
          participationPercent={
            divider ? Math.ceil((ratingCount / divider) * 100 * scaleFactor) : 0
          }
          ratingCount={ratingCount}
        />
      ))}
  </>
);

const getTotalRatingDiff = (sum: number, prevRating: Rating) => {
  let diff = 0;

  if (prevRating) {
    diff = sum - calcSum(prevRating);
  }

  return diff;
};

const Summary: React.FC = () => {
  const [rating, setRating] = useState<Rating>(initialRating);
  const [totalRatingDiff, setTotalRatingDiff] = useState<number>(0);
  const {
    ratingsOverTime = {},
    ratingsWithReview,
    ratingsWithReviewDiff,
  } = useSelector((state: RootState) => state.ratingAndReviews);

  const sum = calcSum(rating);
  const divider = Object.values(rating).reduce((a, b) => a + b);
  const totalRating = getTotalRating(sum, divider);

  let scaleFactor = 0;
  if (rating['5'] && divider) {
    scaleFactor = 100 / Math.ceil((rating['5'] / divider) * 100);
  }

  React.useEffect(() => {
    const values = Object.values(ratingsOverTime);
    const lastRating = [...values].pop();

    if (values.length > 0 && lastRating) {
      setRating(lastRating);
      const prevRating = values[values.length - 2];
      const diff = getTotalRatingDiff(sum, prevRating as any);
      setTotalRatingDiff(diff);
    }
  }, [sum, ratingsOverTime]);

  return (
    <Container disableGutters maxWidth={false}>
      <Box
        display="flex"
        justifyContent="space-between"
        width="1"
        flexWrap="wrap"
      >
        <BoxColumn size={25}>
          <TotalRating ratingValue={totalRating} />
        </BoxColumn>
        <BoxColumn size={25}>
          <RatingRows
            rating={rating}
            scaleFactor={scaleFactor}
            divider={divider}
          />
        </BoxColumn>
        <BoxColumn size={25}>
          <RatingStats
            ratingsWithReview={ratingsWithReview}
            totalRating={divider}
            _ratingsWithReviewDiff={ratingsWithReviewDiff}
            _totalRatingDiff={totalRatingDiff}
          />
        </BoxColumn>
      </Box>
    </Container>
  );
};

type Props = {
  url?: string;
};

export const TotalRatings: React.FC<Props> = ({ url }) => {
  const { ratingsLoading } = useSelector(
    (state: RootState) => state.ratingAndReviews
  );

  return (
    <Totals
      isDataLoading={ratingsLoading}
      leftSideTitle="Ratings Summary"
      leftSideChildren={<Summary />}
      detailsBtnUrl={url}
      minHeight={255}
    />
  );
};
