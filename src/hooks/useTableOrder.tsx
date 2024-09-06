import { OrderType, ORDER_TYPES } from 'components/OrderButton';
import { useState, useCallback } from 'react';

export type TableOrder = {
  key: string;
  type: OrderType;
};

const useTableOrder = (initialOrderKey: string, applyCallback?: () => void) => {
  const [key, setOrderKey] = useState<string>(initialOrderKey);
  const [type, setOrderType] = useState<OrderType>(ORDER_TYPES.ASC);

  const setOrder = useCallback(
    (tableOrderKey: string, orderType: OrderType) => {
      setOrderKey(tableOrderKey);
      setOrderType(orderType);
    },
    []
  );

  const handleOrderChange = useCallback(
    (isActive: boolean, tableOrderKey: string, orderType: OrderType) => {
      let order: OrderType;

      if (isActive && orderType === ORDER_TYPES.ASC) {
        order = ORDER_TYPES.DESC;
      } else {
        order = ORDER_TYPES.ASC;
      }

      //   else if (isActive && orderType === ORDER_TYPES.DESC) {
      //     order = undefined;
      //   }

      if (applyCallback) {
        applyCallback();
      }

      setOrder(tableOrderKey, order);
    },
    [setOrder, applyCallback]
  );

  return {
    orderKey: key,
    orderType: type,
    setOrder,
    handleOrderChange,
  };
};

export default useTableOrder;
