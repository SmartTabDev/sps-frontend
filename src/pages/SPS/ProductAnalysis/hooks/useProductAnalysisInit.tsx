import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { init } from 'reducers/productAnalysis/init';

export const useProductAnalysisInit = (configId?: number): void => {
  const dispatch = useDispatch();

  const configAccessToken = useSelector(
    (state: RootState) => state.auth.configAccessToken,
  );

  useEffect(() => {
    if (configAccessToken) {
      // get view options, set initial timeframe
      dispatch(init(configId));
    }
  }, [dispatch, configAccessToken, configId]);
};
