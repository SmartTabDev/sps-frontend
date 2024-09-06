import {
  IconButton,
  IconButtonProps,
  SvgIconTypeMap,
  Tooltip,
  TooltipProps,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { styled, SxProps } from '@mui/system';
import { useTheme } from '@mui/material/styles';
// eslint-disable-next-line import/no-unresolved
import { OverridableComponent } from '@mui/material/OverridableComponent';

const StyledIconButton = styled(IconButton)`
  fill: #525f81;
  background: white;
  width: 40px;
  height: 40px;

  svg {
    fill: inherit;
    cursor: pointer;
    max-height: 18px;
  }

  &:hover {
    fill: #447eeb;
    box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2);
    filter: drop-shadow(0px 6px 10px rgba(0, 0, 0, 0.14))
      drop-shadow(0px 1px 18px rgba(0, 0, 0, 0.12));
  }

  &:active {
    filter: drop-shadow(0px 2px 3px rgba(64, 123, 255, 0.1))
      drop-shadow(0px -2px 3px rgba(64, 123, 255, 0.1)) !important;
  }
`;

type Icon = OverridableComponent<SvgIconTypeMap> & { muiName: string };

export type ActionHeaderButtonProps = {
  tooltipProps?: Omit<TooltipProps, 'children'>;
  iconButtonProps?: IconButtonProps;
  ActiveIcon: Icon;
  InactiveIcon?: Icon;
  isActive?: boolean;
  activeIconProps?: { sx: SxProps };
  inactiveIconProps?: { sx: SxProps };
};

const ActionHeaderButton = ({
  tooltipProps = {} as any,
  iconButtonProps = {} as any,
  ActiveIcon,
  InactiveIcon,
  isActive = true,
  activeIconProps = {} as any,
  inactiveIconProps = {} as any,
}: ActionHeaderButtonProps) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const theme = useTheme();

  const handleMouseEnter = () => {
    if (!isOpen) {
      setOpen(true);
      timeout.current = setTimeout(() => setOpen(false), 3000);
    }
  };

  const onMouseOut = () => {
    if (isOpen) {
      setOpen(false);
    }
    if (timeout.current) {
      clearTimeout(timeout.current); // cancel scheduled hiding of tooltip
      timeout.current = null;
    }
  };

  useEffect(
    () => () => {
      // when component unmounts, clear scheduled hiding - nothing to hide by this point=)
      if (timeout.current) {
        clearTimeout(timeout.current);
        timeout.current = null;
      }
    },
    []
  );

  return (
    <Tooltip
      arrow
      placement="bottom"
      PopperProps={{
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, -10],
            },
          },
        ],
        sx: {
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: theme.zIndex.drawer + 2,
        },
      }}
      open={isOpen}
      {...tooltipProps}
    >
      <StyledIconButton
        disableFocusRipple
        disableRipple
        disableTouchRipple
        {...iconButtonProps}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={onMouseOut}
      >
        {!isActive && InactiveIcon ? (
          <InactiveIcon {...inactiveIconProps} />
        ) : (
          <ActiveIcon {...activeIconProps} />
        )}
      </StyledIconButton>
    </Tooltip>
  );
};

export default ActionHeaderButton;
