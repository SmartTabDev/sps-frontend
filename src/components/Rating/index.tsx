import React from 'react';
import { styled, css } from '@mui/system';
import { CustomRating } from 'components/CustomRating';
import { getNumberFromPercentage } from 'utils/getPercentage';

const Wrapper = styled('div', {
  shouldForwardProp: (props) => props !== '$breakLine',
})<{ $breakLine?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  color: #333333;

  ${({ $breakLine }) =>
    $breakLine
      ? css`
          flex-direction: column;
          align-items: center;
        `
      : ''}
`;

const Breakline = styled('div', {
  shouldForwardProp: (props) => props !== '$isActive',
})<{ $isActive?: boolean }>`
  display: ${({ $isActive }) => ($isActive ? 'block' : 'flex')};
`;

const Data = styled('div', {
  shouldForwardProp: (props) => props !== '$fontSize' && props !== '$textColor',
})<{ $fontSize?: string; $breaklined?: boolean; $textColor?: string }>`
  color: ${({ $textColor }) => $textColor};
  font-size: ${({ $fontSize }) => $fontSize};
  text-align: left;
  display: flex;
  margin-left: ${({ $breaklined }) => ($breaklined ? `5px` : '10px')};
  white-space: nowrap;
`;

const Score = styled('div', {
  shouldForwardProp: (props) => props !== '$fontSize' && props !== '$textColor',
})<{ $fontSize?: string; $textColor?: string }>`
  color: ${({ $textColor }) => $textColor};
  font-size: ${({ $fontSize }) => $fontSize};
`;

const RatingScoreWrapper = styled('div')`
  margin-left: -5px;
  display: flex;
`;

interface Props {
  scoring?: number;
  reviewsCount?: number;
  reviewsText?: string;
  reviewsTextFontSize?: string;
  scoringFontSize?: string;
  textColor?: string;
  breakLine?: boolean;
}

const Rating: React.FC<Props> = ({
  scoring,
  reviewsCount,
  reviewsText = '',
  reviewsTextFontSize = '14px',
  scoringFontSize = 'inherit',
  textColor = 'inherit',
  breakLine = false,
}) => {
  if (scoring && reviewsCount) {
    const score = getNumberFromPercentage(scoring, 5);

    return (
      <Wrapper $breakLine={breakLine}>
        <Breakline $isActive={breakLine}>
          <RatingScoreWrapper>
            <CustomRating value={score} fillwith="#F2C94C" size="small" />
            <Score $fontSize={scoringFontSize} $textColor={textColor}>
              &nbsp;
              {score}
            </Score>
          </RatingScoreWrapper>
          <Data
            $fontSize={reviewsTextFontSize}
            $textColor={textColor}
            $breaklined={breakLine}
          >
            ({reviewsCount}
            {reviewsText ? ` ${reviewsText}` : ''})
          </Data>
        </Breakline>
      </Wrapper>
    );
  }
  return null;
};

export default Rating;
