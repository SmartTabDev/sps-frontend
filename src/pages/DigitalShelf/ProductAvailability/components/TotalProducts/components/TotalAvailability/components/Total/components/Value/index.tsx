import React from 'react';
import { styled, css } from '@mui/system';

const ValueWrapper = styled('div', {
  shouldForwardProp: (props) => props !== '$value',
})<{ $value: number }>`
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 0.04em;
  display: inline-block;
  position: absolute;
  left: 80px;
  top: 8px;

  ${({ $value }) => $value > 15
    && css`
      left: initial;
      right: calc(${100 - $value}% - 50px);
    `}
`;

type Props = {
  value: number;
};

const Value: React.FC<Props> = ({ value }) => (
  <ValueWrapper $value={value}>
    {value}
    %
  </ValueWrapper>
);

export default Value;
