import React from 'react';
import { Box } from '@mui/material';
import { formatPercentage } from 'utils/formatPercentage';
import {
  BorderLinearProgress,
  StyledBar,
  StyledHeader,
  StyledIconDown,
  StyledIconSquare,
  StyledIconUp,
} from './style';

type Props = {
  name: string;
  value: number;
  change: number;
  color?: 'success' | 'warning' | 'error';
};

const getIcon = (change: number) => {
  if (change > 0) return <StyledIconUp />;
  if (change < 0) return <StyledIconDown />;
  return <StyledIconSquare />;
};

export const ProgressBar: React.FC<Props> = ({
  name,
  value,
  change,
  color = 'warning',
}) => {
  return (
    <Box
      py={1}
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      <StyledHeader>
        <span>{name}</span>
        <Box>
          <span>
            <span>{value}</span>%
          </span>
          <span>
            <span>{formatPercentage(change, true)}</span>
          </span>
        </Box>
      </StyledHeader>
      <StyledBar>
        <BorderLinearProgress
          color={color}
          variant="determinate"
          value={value}
          sx={{ mr: 0.5 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {getIcon(change)}
        </Box>
      </StyledBar>
    </Box>
  );
};
