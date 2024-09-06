import { prmApi } from 'api';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import handleRequestError from 'reducers/auth/handleRequestError';

interface Hook<T> {
  data?: T[];
}

export function useProductMonitorConfigData<T>(name: string): Hook<T> {
  const dispatch = useDispatch();
  const [configData, setConfigData] = useState<Hook<T>['data']>();

  const configAccessToken = useSelector(
    (state: RootState) => state.auth.configAccessToken,
  );

  const fetch = useCallback(async () => {
    try {
      const { data } = await prmApi({
        method: 'get',
        url: `/prm/${name}`,
        headers: {
          accesstoken: configAccessToken,
        },
      });
      setConfigData(data);
    } catch (error) {
      dispatch(handleRequestError(error, 'fetchProductMonitorConfigData'));
    }
  }, [configAccessToken, dispatch, name]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data: configData };
}
