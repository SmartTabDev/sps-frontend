import { Query } from '@cubejs-client/core';
import { newCubejsApi } from 'api';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import handleRequestError from 'reducers/auth/handleRequestError';

export function getQueryFilter(dimensions: string[]): Query {
  return {
    dimensions,
  };
}

export type Filter<K extends string = string> = {
  name: string;
  id: number;
} & (K extends string ? Record<K, any> : Record<string, never>);

export async function fetchFilterData<K extends string>(
  cubeAccessToken: string | undefined,
  mainDimension: string,
  additionalDimension: string | undefined,
  regionCodeToFetch: string | undefined
): Promise<Filter<K>[]> {
  const dimensionsToFetch = additionalDimension
    ? [mainDimension, additionalDimension]
    : [mainDimension];
  const res = await newCubejsApi(cubeAccessToken, regionCodeToFetch).load(
    getQueryFilter(dimensionsToFetch)
  );
  const rows = res.rawData();
  const data = rows
    .map((row) => ({
      name: row[mainDimension],
      id: 0,
      ...(additionalDimension && {
        [additionalDimension.split('.')[1] as string]: row[additionalDimension],
      }),
    }))
    .filter((item) => !!item.name);

  return data as Filter<K>[];
}

export function useFilter<K extends string = string>(
  mainDimension: string,
  additionalDimension?: string
): {
  filter: Filter<K>[];
  isFilterLoading: boolean;
  fetchFilter: (regionCodeToFetch: string | undefined) => Promise<void>;
} {
  const dispatch = useDispatch();
  const [isLoadingFilter, setLoadingFilter] = useState<boolean>(false);
  const [filter, setFilter] = useState<Filter<K>[]>([]);

  const cubeAccessToken = useSelector(
    (state: RootState) => state.auth.cubeAccessToken
  );

  const fetchFilter = useCallback(
    async (regionCodeToFetch: string | undefined) => {
      if (cubeAccessToken) {
        setLoadingFilter(true);

        try {
          const data = await fetchFilterData<K>(
            cubeAccessToken,
            mainDimension,
            additionalDimension,
            regionCodeToFetch
          );
          setFilter(data);
        } catch (error) {
          dispatch(handleRequestError(error, `fetchFilter-${mainDimension}`));
        }

        setLoadingFilter(false);
      }
    },
    [cubeAccessToken, dispatch, mainDimension, additionalDimension]
  );

  return {
    filter,
    isFilterLoading: isLoadingFilter,
    fetchFilter,
  };
}
