import React from 'react';
import Box from '@mui/material/Box';
import { RecapCardType } from 'components/Recaps/utils/types';
import { styled } from '@mui/system';
import TrendValue from '../TrendValue/TrendValue';

const StyledContainer = styled(Box)`
  display: flex;
  align-items: baseline;
  padding: 0 16px;
`;

type SubtitleProps = Pick<RecapCardType, 'color' | 'positive' | 'subtitle'> & {
  percentage: boolean;
};

const Subtitle: React.FC<SubtitleProps> = ({
  color,
  percentage,
  positive,
  subtitle,
}) => {
  return (
    <StyledContainer>
      <TrendValue
        color={color}
        percentage={percentage}
        positive={positive}
        value={subtitle}
        useIcon
        size="medium"
      />
    </StyledContainer>
  );
};

export default Subtitle;
