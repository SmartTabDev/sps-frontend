import React from 'react';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { Box, styled } from '@mui/system';
import Typography from '@mui/material/Typography';
import { getTrendColor, Trend } from 'utils/colors/getTrendColor';
import Symbol from '../Symbol/Symbol';

const IconContainer = styled('div')`
  display: flex;
  top: 3px;
  position: relative;

  svg {
    color: inherit;
    width: 18px;
    height: 18px;
    margin-right: 7px;
  }
`;

const StyledTypography = styled(Typography)<{
  $bold: boolean;
  $size?: 'small' | 'medium' | 'large';
}>`
  color: inherit;
  font-weight: ${(props) => (props.$bold ? 500 : 400)};
  font-size: ${(props) => {
    switch (props.$size) {
      case 'small':
        return '12px';
      case 'medium':
        return '14px';
      case 'large':
        return '18px';
      default:
        return '14px';
    }
  }};
`;

type TrendValueProps = {
  bold?: boolean;
  color?: string;
  percentage?: boolean;
  positive?: boolean;
  size?: 'small' | 'medium' | 'large';
  useIcon?: boolean;
  usePlusMinus?: boolean;
  useTrendColor?: boolean;
  value?: string | number;
};

const TrendValue: React.FC<TrendValueProps> = ({
  bold = false,
  color,
  percentage,
  positive,
  size = 'large',
  useIcon = false,
  usePlusMinus = false,
  useTrendColor = false,
  value,
}) => {
  let IconComponent = null;
  let Char = null;
  let trendColor = 'inherit';
  const propsColor = color || 'inherit';

  const nValue = Number(value);
  const isTrendingUp = positive && nValue !== 0;
  const isTrendingDown = !positive && nValue !== 0;
  const noChange = nValue === 0;

  if (isTrendingUp) {
    IconComponent = <TrendingUpIcon />;
    Char = <>+</>;
    trendColor = getTrendColor(Trend.UP);
  } else if (isTrendingDown) {
    IconComponent = <TrendingDownIcon />;
    Char = <>-</>;
    trendColor = getTrendColor(Trend.DOWN);
  } else if (noChange) {
    IconComponent = <DragHandleIcon />;
    Char = <></>;
    trendColor = getTrendColor(Trend.NO_CHANGE);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        color: useTrendColor ? trendColor : propsColor,
        alignItems: 'baseline',
      }}
    >
      {useIcon ? <IconContainer>{IconComponent}</IconContainer> : null}
      {usePlusMinus ? Char : null}
      <>
        <StyledTypography $bold={bold} $size={size}>
          {value}
        </StyledTypography>
        {percentage ? (
          <Symbol $size="10px" $weight={600} $spacing={2}>
            %
          </Symbol>
        ) : null}
      </>
    </Box>
  );
};

export default TrendValue;
