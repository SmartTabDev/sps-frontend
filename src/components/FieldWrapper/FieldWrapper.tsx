import { styled, css } from '@mui/system';
import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { ReactComponent as QuestionMark } from './question-circle-regular.svg';

type FieldWrapperProps = {
  $marginTopSize?: 'small' | 'medium' | 'big';
  $marginBottomSize?: 'medium';
};

const FieldWrapper = styled('div', {
  shouldForwardProp: (props) => props !== '$marginTopSize' && props !== '$marginBottomSize',
})<FieldWrapperProps>`
  ${({ $marginTopSize }) => $marginTopSize === 'small'
    && css`
      margin-top: 25px;
    `}

    ${({ $marginTopSize }) => $marginTopSize === 'medium'
      && css`
        margin-top: 30px;
      `}

    ${({ $marginTopSize }) => $marginTopSize === 'big'
      && css`
        margin-top: 40px;
      `}


    ${({ $marginBottomSize }) => $marginBottomSize === 'medium'
      && css`
        margin-bottom: 30px;
      `}

`;

export const StyledFieldName = styled('div')`
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.palette.blueGrey[400]};
  position: relative;
  display: inline-block;
`;

const StyledQuestionMark = styled(QuestionMark)`
  width: 12px;
  color: ${({ theme }) => theme.palette.primary.main};
  position: absolute;
  top: -4px;
  right: -15px;
`;

type FieldNameProps = {
  tooltip?: string;
};

export const FieldName: React.FC<FieldNameProps> = ({ children, tooltip }) => (
  <StyledFieldName>
    {children}
    {tooltip && (
      <Tooltip title={tooltip} arrow placement="top">
        <StyledQuestionMark />
      </Tooltip>
    )}
  </StyledFieldName>
);

export default FieldWrapper;
