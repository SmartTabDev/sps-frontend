import React from 'react';
import TableCell from '@mui/material/TableCell';
import { styled } from '@mui/system';
import { CustomRating } from '../../CustomRating';

export type RatingCellProps = {
  rating: number;
};

const StyledRatingCell = styled(TableCell)`
  .rating {
    width: 30px;
    font-weight: 700;
  }

  > div {
    display: flex;
  }
`;

const RatingCell: React.FC<RatingCellProps> = ({ rating }) => (
  <StyledRatingCell>
    <div>
      <span className="rating">{rating}</span>
      <CustomRating value={rating} size="small" />
    </div>
  </StyledRatingCell>
);

export default RatingCell;
