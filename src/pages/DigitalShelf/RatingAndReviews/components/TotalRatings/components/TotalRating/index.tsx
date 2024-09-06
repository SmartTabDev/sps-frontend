import React from 'react';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CustomRating } from 'components/CustomRating';

type SummaryRatingWrapperProps = {
  [key: string]: any;
};

const Visual = styled(Box)<SummaryRatingWrapperProps>`
  color: ${({ theme }) => theme.palette.blueGrey[400]};
`;

type Props = {
  ratingValue: string;
};

export const TotalRating: React.FC<Props> = ({ ratingValue }) => (
  <Visual>
    <Typography variant="h2" gutterBottom>
      {ratingValue}
    </Typography>
    <CustomRating
      value={parseFloat(parseFloat(ratingValue).toFixed(2))}
      size="large"
    />
  </Visual>
);
