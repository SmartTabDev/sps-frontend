import React from 'react';
import { styled, css } from '@mui/system';
import Chip from '@mui/material/Chip';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { getPercentage } from '../../utils/getPercentage';
import { Line } from '../Line/Line';

export type PositionProps = {
  place?: number | null;
  amount?: number | null;
  tooltipValue?: string;
};

const Circle = css`
  content: '';
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 8px;
  top: 50%;
  position: absolute;
  transform: translateY(-50%);
`;

const StyledLine = styled(Line)`
  position: relative;

  &::before {
    ${Circle}
    left: -4px;
    background-color: ${({ theme }) => theme.palette.primary.main};
  }

  &::after {
    ${Circle}
    right: -4px;
    background-color: ${({ theme }) => theme.palette.secondary.dark};
  }
`;

const StyledWrapper = styled('div')`
  position: relative;
  width: 250px;
`;

const StyledChip = styled(Chip, {
  shouldForwardProp: (props) =>
    props !== '$position' && props !== '$outOfRange',
})<{ $outOfRange: boolean; $position: number }>`
  position: absolute;
  top: -30px;
  border-radius: 3px;
  height: 20px;
  font-weight: bold;
  font-size: 11px;
  line-height: 20px;
  left: ${({ $position }) => $position}%;
  transform: translateX(-50%);
  background: #2f80ed;
  border: 1px solid #2f80ed;
  color: ${({ theme }) => theme.palette.grey[100]};

  ${({ $outOfRange, theme }) =>
    $outOfRange &&
    css`
      left: 50%;
      background: ${theme.palette.grey[500]};
      border: 1px solid ${theme.palette.grey[500]};
    `}
`;

const StyledTooltip = styled('div', {
  shouldForwardProp: (props) => props !== '$position',
})<{ $position: number }>`
  position: relative;
  svg {
    position: absolute;
    top: -20px;
    color: #2f80ed;
    left: ${({ $position }) => $position}%;
    transform: translateX(-50%);
  }
`;

const Position: React.FC<PositionProps> = ({ place, amount, tooltipValue }) => {
  const outOfRange =
    !place || !amount || place > amount || tooltipValue === '-';
  const labelValue = tooltipValue || `${place || '-'} / ${amount || '-'}`;
  let position = -1;

  if (!outOfRange) {
    if (place === 1) {
      position = 0;
    } else {
      position = getPercentage(place, amount);
    }
  }

  return (
    <StyledWrapper>
      <StyledTooltip $position={position}>
        <StyledChip
          variant="outlined"
          size="small"
          label={labelValue}
          $outOfRange={outOfRange}
          $position={position}
        />
        {!outOfRange && <ArrowDropDownIcon />}
      </StyledTooltip>
      <StyledLine
        background="linear-gradient(90deg, #447EEB 12.6%, #56CCF2 88.85%)"
        height={6}
      />
    </StyledWrapper>
  );
};

export default Position;
