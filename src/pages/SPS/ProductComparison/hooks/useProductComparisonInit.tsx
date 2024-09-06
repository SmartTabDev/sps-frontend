import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProductComparisonFilters } from 'reducers/config/actions';
import {
  resetVariants,
  setInitialForm,
} from 'reducers/productComparison/actions';

export const useProductComparisonInit = (configId?: number): void => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setInitialForm());
    dispatch(resetVariants());
    if (configId) {
      dispatch(getProductComparisonFilters(configId));
    }
  }, [dispatch, configId]);
};
