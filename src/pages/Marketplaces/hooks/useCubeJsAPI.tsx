import { Filter, Query, QueryOrder } from '@cubejs-client/core'; // cubejs,
import getDimensionKeys from 'utils/cube/getDimensionKeys';
import axios from 'axios';
import {
  useRef,
  useEffect,
  SetStateAction,
  useCallback,
  useState,
} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import handleRequestError from 'reducers/auth/handleRequestError';

interface Hook<T> {
  list: (T | undefined)[];
  item: T | undefined;
  fetchData: (
    clientName?: string,
    offset?: number,
    filters?: Filter[],
    order?: { [x: string]: QueryOrder }
  ) => void;
  isLoading: boolean;
  setList: React.Dispatch<SetStateAction<(T | undefined)[]>>;
  isLoaded: boolean;
  isMore: boolean;
  offset: number;
}

const defaultMaping = <T, R>(x: R) => x as unknown as T;
/**
 * This is generic hook for marketplace table
 */
export function useCubeJsAPI<T, R>(
  _queryName: string,
  query: Query | null,
  initialState: (T | undefined)[],
  dataMapping: (a: R) => T = defaultMaping
): Hook<T> {
  const mounted = useRef(false);

  const dispatch = useDispatch();
  const cubeAccessToken = useSelector(
    (state: RootState) => state.auth.cubeAccessToken
  );
  const [list, setList] = useState<Hook<T>['list']>(initialState);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isMore, setIsMore] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);

  const fetchData = useCallback(
    async (clientName = '', currentOffset = 0, filters = [], order = {}) => {
      if (cubeAccessToken && query) {
        setLoading(true);

        try {
          const res = await axios.post<{ data: T[] }>(
            `${process.env.REACT_APP_CUBE_JS_API}/load`,
            {
              query: {
                ...query,
                offset: currentOffset,
                filters: [...(query.filters || []), ...filters],
                order: { ...(query.order || {}), ...order },
              },
            } as Query,
            {
              headers: {
                'Content-type': 'application/json',
                Authorization: cubeAccessToken,
                ...(clientName ? { clientName } : {}),
              },
            }
          );

          const parsedData = res.data.data
            .map((data) => getDimensionKeys(data) as R)
            .map(dataMapping);

          // memory leak unmounted component
          if (mounted.current) {
            if (currentOffset === 0) {
              setOffset(parsedData.length);
              setList(parsedData);
            } else {
              setList((prevList) => [...prevList, ...parsedData]);
              setOffset((o) => o + parsedData.length);
            }

            if (parsedData.length > 0) {
              setIsMore(true);
            } else {
              setIsMore(false);
            }

            setLoading(false);
            setIsLoaded(true);
          }
        } catch (error) {
          if (mounted.current) {
            setLoading(false);
            setIsMore(false);
            dispatch(handleRequestError(error, 'useCubeJsAPI'));
          }
        }
      }
    },
    [cubeAccessToken, query, dataMapping, dispatch]
  );

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return {
    item: list[0],
    offset,
    list,
    isLoading,
    fetchData,
    setList,
    isLoaded,
    isMore,
  };
}
