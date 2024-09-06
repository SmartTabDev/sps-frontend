/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Box, BoxProps, styled, SxProps } from '@mui/system';
import { Tooltip, TooltipProps, Typography } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const StyledUnifyCard = styled(Box)`
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px -2px 0px rgba(0, 0, 0, 0.02), 0px 4px 16px rgba(0, 0, 0, 0.15);
  padding: 16px 20px;
  position: relative;
`;

export const UnifyCard: React.FC<BoxProps> = ({ children, ...props }) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <StyledUnifyCard {...props}>{children}</StyledUnifyCard>;
};

const StyledUnifyCardTitle = styled(Typography)`
  font-size: 16px;
  color: #3b455e;
  text-transform: uppercase;
`;

type UnifyCardTitleProps = {
  tooltipProps?: Omit<TooltipProps, 'children'>;
  sx?: SxProps;
};

export const UnifyCardTitle: React.FC<UnifyCardTitleProps> = ({
  children,
  tooltipProps,
  ...props
}) => {
  const theme = useTheme();
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <StyledUnifyCardTitle {...props}>
      {children}
      {tooltipProps?.title && (
        <Tooltip
          arrow
          placement="right"
          PopperProps={{
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, 0],
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
          title={tooltipProps.title}
        >
          <InfoOutlined
            sx={{
              fill: '#525F81',
              width: 16,
              height: 16,
              ml: '4px',
            }}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          />
        </Tooltip>
      )}
    </StyledUnifyCardTitle>
  );
};
