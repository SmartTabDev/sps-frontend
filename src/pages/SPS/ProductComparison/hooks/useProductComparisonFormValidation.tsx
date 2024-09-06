import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

export const useProductComparisonFormValidation = (): {
  isDisabled: boolean;
} => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const selectedProducts = useSelector(
    (state: RootState) => state.productComparison.selectedProducts,
  );
  const selectedRetailers = useSelector(
    (state: RootState) => state.productComparison.selectedRetailers,
  );
  const { startDate, endDate } = useSelector(
    (state: RootState) => state.productComparison,
  );

  useEffect(() => {
    const result = isEmpty(selectedProducts.filter(Boolean))
      || isEmpty(selectedRetailers)
      || !startDate
      || !endDate;
    setIsDisabled(result);
  }, [selectedProducts, selectedRetailers, startDate, endDate]);

  return {
    isDisabled,
  };
};
