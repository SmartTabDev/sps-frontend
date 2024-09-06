import { newCubejsApi } from 'api';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import handleRequestError from 'reducers/auth/handleRequestError';
import getCubeName from 'utils/getCubeName';

const Runs = getCubeName('Runs', 'shopee');

export function useRuns(regionCode: string | undefined): string[] {
  const dispatch = useDispatch();
  const [result, setResult] = useState<string[]>([]);

  const cubeAccessToken = useSelector(
    (state: RootState) => state.auth.cubeAccessToken
  );

  const fetch = useCallback(
    async (regionCodeToFetch: string | undefined) => {
      if (cubeAccessToken) {
        try {
          const res = await newCubejsApi(
            cubeAccessToken,
            regionCodeToFetch
          ).load({
            dimensions: [`${Runs}.createdat`],
            limit: 1,
            order: {
              [`${Runs}.createdat`]: 'desc',
            },
          });
          const rows = res.rawData();

          const data = rows.map((r) => r[`${Runs}.createdat`]);

          setResult(data as string[]);
        } catch (error) {
          dispatch(handleRequestError(error, 'fetchRuns'));
        }
      }
    },
    [cubeAccessToken, dispatch]
  );

  useEffect(() => {
    if (cubeAccessToken && regionCode) {
      fetch(regionCode);
    }
  }, [regionCode, cubeAccessToken, fetch]);

  return result;
}
