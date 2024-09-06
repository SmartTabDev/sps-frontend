import React, { useContext } from 'react';
import { styled } from '@mui/system';
import { Tooltip } from '@mui/material';
import BadgesContext from './BadgesContext';

const StyledBadge = styled('div', {
  shouldForwardProp: (props) =>
    props !== '$color' && props !== '$asButton' && props !== '$size',
})<{
  $asButton: boolean;
  $size: number;
  $color: string;
}>`
  cursor: ${({ $asButton }) => ($asButton ? 'pointer' : 'initial')};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  svg {
    color: ${({ $asButton, $color }) => ($asButton ? `${$color}` : '#525F81')};
    font-size: ${({ $size }) => $size}px;
  }
`;

export type BadgeWrapperProps = {
  tooltipTitle?: string;
  isActive?: boolean;
  activeIcon: React.ElementType;
  inactiveIcon: React.ElementType;
  handleClick?: () => void;
};

const BadgeWrapper: React.FC<BadgeWrapperProps> = ({
  isActive = false,
  activeIcon,
  inactiveIcon,
  handleClick,
  tooltipTitle,
}) => {
  const { asButton, size, colors } = useContext(BadgesContext);
  const ActiveIcon = asButton ? inactiveIcon : activeIcon;
  const InactiveIcon = inactiveIcon;

  return (
    <Tooltip
      arrow
      placement="bottom"
      PopperProps={{
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 0],
            },
          },
        ],
      }}
      sx={{
        dispaly: tooltipTitle ? 'block' : 'none',
      }}
      title={tooltipTitle}
    >
      <StyledBadge
        onClick={handleClick}
        $asButton={asButton}
        $size={size}
        $color={isActive ? colors.primary : colors.outline}
      >
        {isActive ? (
          <ActiveIcon color={colors.primary} />
        ) : (
          <InactiveIcon color={colors.outline} />
        )}
      </StyledBadge>
    </Tooltip>
  );
};

export default BadgeWrapper;
