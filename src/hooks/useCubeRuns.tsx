import { QueryOrder } from '@cubejs-client/core';
import { newCubejsApi } from 'api';
import { ConfigContext } from 'contexts/ConfigContext';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import handleRequestError from 'reducers/auth/handleRequestError';

export function getQueryRuns(dimension: string) {
  const query = {
    dimensions: [dimension],
    limit: 2,
    order: {
      [dimension as string]: 'desc' as QueryOrder,
    },
  };
  return query;
}

export type RunDate = string | undefined;

async function fetch(
  cubeAccessToken: string | undefined,
  mainDimension: string,
  regionCodeToFetch: string | undefined
): Promise<[RunDate, RunDate]> {
  const query = getQueryRuns(mainDimension);
  const res = await newCubejsApi(cubeAccessToken, regionCodeToFetch).load(
    query
  );
  const rows = res.rawData();
  const data = rows.map((row) => row[mainDimension]);

  return data as [RunDate, RunDate];
}

export function useCubeRuns(mainDimension: string): {
  currentRunDate: RunDate;
  previousRunDate: RunDate;
  isLoadingCubeRuns: boolean;
} {
  const dispatch = useDispatch();
  const { regionCode } = useContext(ConfigContext);

  const [isLoadingCubeRuns, setIsLoadingCubeRuns] = useState<boolean>(false);
  const [currentRunDate, setCurrentRunDate] = useState<RunDate>(undefined);
  const [previousRunDate, setPreviousRunDate] = useState<RunDate>(undefined);

  const cubeAccessToken = useSelector(
    (state: RootState) => state.auth.cubeAccessToken
  );

  const fetchCubeRuns = useCallback(
    async (regionCodeToFetch: string | undefined) => {
      if (cubeAccessToken) {
        setIsLoadingCubeRuns(true);

        try {
          const data = await fetch(
            cubeAccessToken,
            mainDimension,
            regionCodeToFetch
          );
          setCurrentRunDate(data[0]);
          setPreviousRunDate(data[1]);
        } catch (error) {
          dispatch(handleRequestError(error, `fetchCubeRuns-${mainDimension}`));
        }

        setIsLoadingCubeRuns(false);
      }
    },
    [cubeAccessToken, dispatch, mainDimension]
  );

  useEffect(() => {
    if (regionCode && mainDimension) {
      fetchCubeRuns(regionCode);
    }
  }, [fetchCubeRuns, regionCode, mainDimension]);

  return {
    currentRunDate,
    previousRunDate,
    isLoadingCubeRuns,
  };
}
