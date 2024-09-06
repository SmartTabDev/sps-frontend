import { newCubejsApi } from 'api';
import getDimensionKeys from 'utils/cube/getDimensionKeys';
import uniq from 'lodash/uniq';
import orderBy from 'lodash/orderBy';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import handleRequestError from 'reducers/auth/handleRequestError';
import getCubeName from 'utils/getCubeName';
import { ConfigProduct } from 'types/AppConfig';
import splitQuery from '../utils/splitQuery';
import {
  createDateBatches,
  mapRawProductsDataToProductsStructure,
} from './mapper';
import { getQueryCountProducts, getQueryProducts, getQueryRuns } from './query';
import { BaseData } from './type';

const Runs = getCubeName('Runs');
const Variants = getCubeName('Variants');
const BATCH_SIZE = 10;

export function usePriceAnalysisBaseData(
  regionCode: string | undefined,
  configProducts: ConfigProduct[] | undefined,
  dateRange: [string, string] | null,
  filters?: any[]
): BaseData | undefined {
  const dispatch = useDispatch();
  const cubeAccessToken = useSelector(
    (state: RootState) => state.auth.cubeAccessToken
  );

  // this is products array with runs set as undefined
  // const [products, setProducts] = useState<Hook['products']>();
  const [baseData, setBaseData] = useState<BaseData>();

  const fetchBaseData = useCallback(
    async (
      fetchCubeAccessToken: string,
      _regionCode: string | undefined,
      fetchDateRange: [string, string],
      fetchFilters: any[]
    ) => {
      setBaseData(undefined);
      const queryProducts = getQueryProducts(fetchDateRange, fetchFilters);
      const queryRunsDaily = getQueryRuns(fetchDateRange, true);
      const queryRunsHourly = getQueryRuns(fetchDateRange, false);
      const productsCountQuery = getQueryCountProducts(
        fetchDateRange,
        fetchFilters
      );

      try {
        const productsCountRes = await newCubejsApi(
          fetchCubeAccessToken,
          _regionCode
        ).load(productsCountQuery);
        const productsCount = productsCountRes
          .rawData()
          .map((row) => row[`${Variants}.count`])[0];
        const queries = splitQuery(queryProducts, 30000, productsCount);
        const promises = queries.map((q) =>
          newCubejsApi(fetchCubeAccessToken, _regionCode).load(q)
        );

        const resProducts = await Promise.allSettled(promises);
        const bigQueryVariants = resProducts.flatMap((res) =>
          res.status === 'fulfilled' ? res.value.rawData() : []
        );
        const [resRunsDaily, resRunsHourly] = await Promise.all([
          newCubejsApi(fetchCubeAccessToken, _regionCode).load(queryRunsDaily),
          newCubejsApi(fetchCubeAccessToken, _regionCode).load(queryRunsHourly),
        ]);

        const productsWithSortKey = (configProducts! || []).map((c) => ({
          ...c,
          sortName:
            (c.handsetName || '').toLowerCase() || (c.name || '').toLowerCase(),
        }));

        // products order
        const orderedConfigProducts = orderBy(productsWithSortKey, 'sortName');

        const parsedBigQueryVariants = bigQueryVariants.map((data) =>
          getDimensionKeys(data)
        );

        const runsDaily = resRunsDaily
          .rawData()
          .map((row) => row[`${Runs}.createdat`] as string);
        const runsHourly = resRunsHourly
          .rawData()
          .map((row) => row[`${Runs}.createdat`] as string);

        const products = mapRawProductsDataToProductsStructure(
          parsedBigQueryVariants,
          orderedConfigProducts
        );
        const baseDataToSet = {
          products,
          productsOrder: uniq(orderedConfigProducts.map((row) => row.id)),
          runs: {
            Daily: runsDaily,
            Hourly: runsHourly,
          },
          runsBatches: {
            Daily: createDateBatches(runsDaily, BATCH_SIZE),
            Hourly: createDateBatches(runsHourly, BATCH_SIZE),
          },
        };

        setBaseData(baseDataToSet);
      } catch (error) {
        dispatch(handleRequestError(error, 'fetchBaseData'));
      }
    },
    [dispatch, configProducts]
  );

  // load initial data
  useEffect(() => {
    const controller = new AbortController();

    if (
      cubeAccessToken &&
      filters &&
      dateRange &&
      configProducts &&
      configProducts.length > 0
    ) {
      fetchBaseData(cubeAccessToken, regionCode, dateRange, filters);
    }

    return () => {
      controller.abort();
    };
  }, [
    fetchBaseData,
    cubeAccessToken,
    regionCode,
    filters,
    dateRange,
    configProducts,
  ]);

  return baseData;
}
