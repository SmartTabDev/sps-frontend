import getCubeName from 'utils/getCubeName';
import { Query } from '@cubejs-client/core';
import moment from 'moment';
import { useEffect, useMemo } from 'react';
import { Marketplace } from 'reducers/auth/auth';
import { useCubeJsAPI } from './useCubeJsAPI';
import { MarketplaceRun } from '../types';

export type RunsQueryData = {
  lastRunDate: string;
  lastRun?: string;
  isLoading: boolean;
};

export function useRunsQuery(marketplace: Marketplace): RunsQueryData {
  const Runs = getCubeName('Runs', marketplace);

  const runsQuery = useMemo<Query>(
    () => ({
      dimensions: [`${Runs}.createdat`],
      timeDimensions: [],
      order: {
        [`${Runs}.createdat`]: 'desc',
      },
      limit: 10,
    }),
    [Runs],
  );

  const { list: runs, fetchData, isLoading } = useCubeJsAPI<
    MarketplaceRun,
    MarketplaceRun
  >('runs', runsQuery, []);
  const lastRun = runs[0]?.createdat;
  const lastRunDate = moment(lastRun).format('YYYY-MM-DD');

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { lastRunDate, lastRun, isLoading };
}
