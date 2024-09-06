import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { styled, css } from '@mui/system';
import { NorthOutlined, SouthOutlined } from '@mui/icons-material';

export const ORDER_TYPES = {
  DESC: 'desc',
  ASC: 'asc',
};

export type OrderType = (typeof ORDER_TYPES)[keyof typeof ORDER_TYPES];

const { DESC, ASC } = ORDER_TYPES;

const StyledButtonWrapper = styled('div', {
  shouldForwardProp: (props) =>
    props !== '$order' && props !== '$showIcon' && props !== '$align',
})<{
  $order?: string;
  $showIcon?: boolean;
  $align?: 'left' | 'right' | 'center';
}>`
  white-space: nowrap;
  display: flex;
  align-items: center;
  cursor: pointer;
  min-height: 22px;

  ${({ $align }) =>
    $align === 'left' &&
    css`
      justify-content: flex-start;
    `}
  ${({ $align }) =>
    $align === 'right' &&
    css`
      justify-content: flex-end;
    `}
  ${({ $align }) =>
    $align === 'center' &&
    css`
      justify-content: center;
    `}

  button {
    padding: 4px;

    svg {
      width: 12px;
      height: 12px;
      color: ${({ theme }) => theme.palette.blueGrey[500]};
    }
  }

  ${({ $order, theme }) =>
    !$order &&
    css`
      button svg {
        color: ${theme.palette.grey[400]};
      }
    `}
`;

const StyledArrowUp = styled(NorthOutlined, {
  shouldForwardProp: (props) => props !== '$showIcon',
})<{
  $showIcon?: boolean;
}>`
  visibility: ${({ $showIcon }) => ($showIcon ? 'visible' : 'hidden')};
`;

const OrderButton: React.FC<{
  activeOrderKey: string;
  align?: 'left' | 'right' | 'center';
  orderKey: string;
  orderType: OrderType;
  text?: string;
  textPosition?: 'left' | 'right';
  toggleOrder: (isActive: boolean, key: string, type: OrderType) => void;
}> = ({
  activeOrderKey,
  align,
  orderKey,
  orderType,
  text,
  textPosition = 'left',
  toggleOrder,
}) => {
  const [showIcon, setShowIcon] = useState<boolean>(false);
  const isActive = activeOrderKey === orderKey;

  return (
    <StyledButtonWrapper
      $order={orderType}
      onClick={() => toggleOrder(isActive, orderKey, orderType)}
      $showIcon={showIcon}
      $align={align}
      onMouseEnter={() => setShowIcon(true)}
      onMouseLeave={() => setShowIcon(false)}
    >
      {textPosition === 'left' && text}
      <IconButton
        disableRipple
        disableTouchRipple
        disableFocusRipple
        aria-label="change order"
        onClick={() => toggleOrder(isActive, orderKey, orderType)}
      >
        {orderType === DESC && isActive && <SouthOutlined />}
        {orderType === ASC && isActive && <NorthOutlined />}
        {!isActive ? <StyledArrowUp $showIcon={showIcon} /> : null}
      </IconButton>
      {textPosition === 'right' && text}
    </StyledButtonWrapper>
  );
};

export default OrderButton;
