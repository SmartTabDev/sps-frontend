import { Query } from '@cubejs-client/core';
import { newCubejsApi } from 'api';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import handleRequestError from 'reducers/auth/handleRequestError';
import getCubeName from 'utils/getCubeName';
import { FilterActionType, FilterDispatch } from 'hooks/useExpandedFilters';
import {
  PriceAnalysisPriceRange,
  PriceAnalysisTimeframe,
} from '../ProductAnalysis/types';
import { PriceAnalysisFilters } from '../ProductAnalysis/components/ExpandedFilters/types';

const Variants = getCubeName('Variants');

export function getQueryPriceRange(startDate: string, endDate: string): Query {
  return {
    measures: [`${Variants}.minPrice`, `${Variants}.maxPrice`],
    filters: [
      {
        dimension: `${Variants}.price`,
        operator: 'set',
      },
    ],
    timeDimensions: [
      {
        dimension: `${Variants}.rundate`,
        dateRange: [startDate, endDate],
      },
    ],
    limit: 1,
  };
}

export function usePriceAnalysisPriceRange(
  regionCode: string | undefined,
  filterDispatch: FilterDispatch<PriceAnalysisFilters>,
  timeframe: PriceAnalysisTimeframe,
  refreshKey: string
): PriceAnalysisPriceRange {
  const dispatch = useDispatch();
  const cubeAccessToken = useSelector(
    (state: RootState) => state.auth.cubeAccessToken
  );

  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const fetch = useCallback(
    async (
      regionCode: string | undefined,
      _startDate: string,
      _endDate: string
    ) => {
      if (cubeAccessToken) {
        try {
          const res = await newCubejsApi(cubeAccessToken, regionCode).load(
            getQueryPriceRange(_startDate, _endDate)
          );
          const rows = res.rawData();
          const max = rows[0][`${Variants}.maxPrice`];

          setMinPrice(0);
          setMaxPrice(max);
        } catch (error) {
          dispatch(handleRequestError(error, 'usePriceAnalysisPriceRange'));
        }
      }
    },
    [cubeAccessToken, dispatch]
  );

  const priceRange = useMemo(
    () => [Number(minPrice), Number(maxPrice)],
    [minPrice, maxPrice]
  ) as [number, number];

  useEffect(() => {
    if (timeframe) {
      const [startDate, endDate] = timeframe;
      fetch(regionCode, startDate, endDate);
    }
  }, [regionCode, timeframe, fetch]);

  useEffect(() => {
    filterDispatch({
      type: FilterActionType.SET,
      payload: {
        key: 'priceRange',
        value: [Number(minPrice), Number(maxPrice)],
      },
    });
  }, [filterDispatch, minPrice, maxPrice, refreshKey]);

  return priceRange;
}
