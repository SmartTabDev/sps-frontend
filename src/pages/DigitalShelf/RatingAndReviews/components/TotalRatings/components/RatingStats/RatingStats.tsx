import React from 'react';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PanelTitle from 'components/PanelTitle';
import { Counter } from 'components/Counter';

const Visual = styled(Box)`
  text-align: left;

  div + div {
    margin-top: 24px;
  }

  @media (max-width: 768px) {
    text-align: center;
  }
`;

type Props = {
  totalRating: number;
  ratingsWithReview: number;
  _totalRatingDiff: number;
  _ratingsWithReviewDiff: number;
};

export const RatingStats: React.FC<Props> = ({
  totalRating,
  ratingsWithReview,
  _ratingsWithReviewDiff,
  _totalRatingDiff,
}) => (
  <Visual>
    <Box>
      <PanelTitle size="small">Total ratings</PanelTitle>
      {/* <Counter change={totalRatingDiff} fontSize={24}> */}
      <Typography variant="h4">{totalRating}</Typography>
      {/* </Counter> */}
    </Box>

    <Box>
      <PanelTitle size="small">ratings with reviews</PanelTitle>
      {/* <Counter change={ratingsWithReviewDiff} fontSize={24}> */}
      <Typography variant="h4">{ratingsWithReview}</Typography>
      {/* </Counter> */}
    </Box>
  </Visual>
);
