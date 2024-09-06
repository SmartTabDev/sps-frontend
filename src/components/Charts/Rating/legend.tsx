import React from 'react';
import { styled } from '@mui/system';
import { CustomRating, ColorConfig } from '../../CustomRating';

const Rectangle = styled('div', {
  shouldForwardProp: (props) => props !== '$color',
})<{ $color: string }>`
  height: 10px;
  width: 10px;
  margin-right: 10px;
  background-color: ${({ $color }) => $color};
`;

const StyledLegendWrapper = styled('div')`
  display: flex;
  flex-wrap: wrap;
  margin-top: 2px;
  margin-left: 6px;
`;

const StyledRatingWrapper = styled('div')`
  display: flex;
  align-items: center;
  margin-right: 4px;
`;

export const Legend: React.FC = () => (
  <StyledLegendWrapper>
    {Object.entries(ColorConfig)
      .reverse()
      .map(([value, color], index) => (
        <StyledRatingWrapper key={index}>
          <Rectangle $color={color} />
          <CustomRating
            // eslint-disable-next-line radix
            value={parseInt(value)}
            twoColors
            size="small"
          />
        </StyledRatingWrapper>
      ))}
  </StyledLegendWrapper>
);
