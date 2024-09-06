import React from 'react';
import { styled } from '@mui/system';
import { CustomRating } from 'components/CustomRating';
import { Line } from 'components/Line/Line';
import { Label } from '../Label/Label';

const Visual = styled('div')`
  display: flex;
  align-items: center;
  padding-bottom: 5px;
`;

const LineWrapper = styled('div')`
  display: flex;
  width: 254px;
  padding: 0 20px;
`;

const StyledLine = styled(Line)<{ width: number }>`
  width: ${({ width }) => (width ? `${width}%` : '0')};
`;

type Props = {
  customColor: string;
  ratingValue: string;
  participationPercent: number;
  ratingCount: number;
};

export const RatingRow: React.FC<Props> = ({
  ratingValue,
  participationPercent,
  ratingCount,
  customColor,
}) => (
  <Visual>
    <CustomRating value={parseInt(ratingValue, 10)} twoColors size="small" />
    <LineWrapper>
      <StyledLine
        background={customColor}
        height={3}
        width={participationPercent}
      />
    </LineWrapper>
    <Label
      variant="subtitle2"
      gutterBottom
      customColor={customColor}
      ratingCount={ratingCount}
    />
  </Visual>
);
