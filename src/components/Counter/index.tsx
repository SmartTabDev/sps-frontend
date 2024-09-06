import React from 'react';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Styled } from 'types/Utils';

type Props = {
  change?: number;
  fontSize: number;
};

type ChangeWrapperProps = Styled<Props>;

const ChangeWrapper = styled(Box, {
  shouldForwardProp: (props) => props !== '$change',
})<ChangeWrapperProps>`
  color: ${({ $change }) => (Number($change) < 0 ? '#eb5757' : '#28a745')};
  display: flex;
  align-items: center;
  margin-left: 3px;
`;

const Visual = styled('div')`
  display: flex;
  align-items: end;
  margin: 6px 0;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const Counter: React.FC<Props> = ({
  children,
  change = 0,
  fontSize,
}) => (
  <Visual>
    {children}

    {change !== 0 && (
    <ChangeWrapper $change={change}>
      {change > 0 ? (
        <ArrowUpwardIcon style={{ fontSize }} />
      ) : (
        <ArrowDownwardIcon style={{ fontSize }} />
      )}
      <span style={{ fontSize }}>{Math.abs(change)}</span>
    </ChangeWrapper>
    )}
  </Visual>
);
