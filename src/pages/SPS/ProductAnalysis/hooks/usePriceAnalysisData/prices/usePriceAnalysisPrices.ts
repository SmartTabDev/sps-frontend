import { newCubejsApi } from 'api';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IndexRange } from 'react-virtualized';
import moment from 'moment';
import { formatRequestDate } from 'components/FormatDate/FormatDate';
import { TableView } from 'types/SPSTable';
import handleRequestError from 'reducers/auth/handleRequestError';
import {
  getDayEndDate,
  getDayStartDate,
} from 'utils/dates/moment/getTimeframe';
import { BaseData, ProductsStructure } from '../baseData/type';
import { fillProductsWithPrices, findBatchesToLoadNow } from './mapper';
import { getQueryPricesDaily, getQueryPricesHourly } from './query';
import splitQuery from '../utils/splitQuery';

interface Hook {
  hourlyProductsWithPrices?: ProductsStructure;
  dailyProductsWithPrices?: ProductsStructure;
  isEmpty?: boolean;
  isSectionLoaded: (params: IndexRange) => Promise<void>;
}

export function usePriceAnalysisPrices(
  regionCode: string | undefined,
  view: TableView,
  filters?: any[],
  baseData?: BaseData
): Hook {
  const dispatch = useDispatch();
  const cubeAccessToken = useSelector(
    (state: RootState) => state.auth.cubeAccessToken
  );

  const [hourlyTriggered, setHourlyTriggered] = useState<
    Record<number, boolean>
  >({});
  const [dailyTriggered, setDailyTriggered] = useState<Record<number, boolean>>(
    {}
  );

  const [hourlyList, setHourlyList] = useState<ProductsStructure>();
  const [dailyList, setDailyList] = useState<ProductsStructure>();
  const [isEmpty, setIsEmpty] = useState<boolean>();

  // fetch some part of prices for table
  const fetchHourlyPrices = useCallback(
    async (
      regionCode: string | undefined,
      dateRangeIndex: number,
      dateRange: [string, string],
      currentProducts: ProductsStructure,
      currentRuns: string[],
      currentFilters: any[]
    ) => {
      if (cubeAccessToken && regionCode) {
        setHourlyTriggered((prev) => ({
          ...prev,
          [dateRangeIndex]: true,
        }));
        const allProductsLength = Object.values(currentProducts).flatMap(
          (product) => product.retailers
        ).length;
        const runsLength = currentRuns.length;
        const allVariantsLength = allProductsLength * runsLength;

        const query = getQueryPricesHourly(dateRange, currentFilters);
        const LIMIT = 30000;
        const queries = splitQuery(query, LIMIT, allVariantsLength);
        const promises = queries.map((q) =>
          newCubejsApi(cubeAccessToken, regionCode).load(q)
        );

        try {
          const resProducts = await Promise.allSettled(promises);
          const rows = resProducts.flatMap((res) =>
            res.status === 'fulfilled' ? res.value.rawData() : []
          );
          setHourlyList(
            fillProductsWithPrices(
              currentProducts,
              rows,
              dateRange,
              currentRuns
            )
          );
        } catch (error) {
          dispatch(handleRequestError(error, 'fetchHourlyPrices'));
        }
      }
    },
    [cubeAccessToken, regionCode, dispatch]
  );

  const fetchDailyPrices = useCallback(
    async (
      regionCode: string | undefined,
      dateRangeIndex: number,
      dateRange: [string, string],
      currentProducts: ProductsStructure,
      currentRuns: string[],
      currentFilters: any[]
    ) => {
      if (cubeAccessToken && regionCode) {
        const correctDateRange: [string, string] = [
          getDayStartDate(dateRange[0]), // first hour
          getDayEndDate(dateRange[1], 1), // add 1 day for scraping
        ];

        setDailyTriggered((prev) => ({
          ...prev,
          [dateRangeIndex]: true,
        }));
        const allProductsLength = Object.values(currentProducts).flatMap(
          (product) => product.retailers
        ).length;
        const runsLength = currentRuns.length;
        const allVariantsLength = allProductsLength * runsLength;

        const query = getQueryPricesDaily(correctDateRange, currentFilters);
        const LIMIT = 30000;
        const queries = splitQuery(query, LIMIT, allVariantsLength);
        const promises = queries.map((q) =>
          newCubejsApi(cubeAccessToken, regionCode).load(q)
        );

        try {
          const resProducts = await Promise.allSettled(promises);
          const rows = resProducts.flatMap((res) =>
            res.status === 'fulfilled' ? res.value.rawData() : []
          );

          setDailyList(
            fillProductsWithPrices(
              currentProducts,
              rows,
              correctDateRange,
              currentRuns
            )
          );
        } catch (error) {
          dispatch(handleRequestError(error, 'fetchDailyPrices'));
        }
      }
    },
    [cubeAccessToken, regionCode, dispatch]
  );

  // check if data for given params is loaded - if not - load them
  const isSectionLoaded = useCallback<Hook['isSectionLoaded']>(
    async (params) => {
      const fetchMethod =
        view === 'Daily' ? fetchDailyPrices : fetchHourlyPrices;
      const list = view === 'Daily' ? dailyList : hourlyList;
      const triggered = view === 'Daily' ? dailyTriggered : hourlyTriggered;

      if (baseData && list && triggered && filters) {
        // console.log('loading section');
        const batches = findBatchesToLoadNow(
          params,
          baseData.runs[view],
          baseData.runsBatches[view],
          triggered
        );

        if (batches.length > 0) {
          const promises = [];
          for (let i = 0; i < batches.length; i += 1) {
            const batchIndex = batches[i];
            if (batchIndex !== undefined) {
              promises.push(
                fetchMethod(
                  regionCode,
                  batchIndex,
                  baseData.runsBatches[view][batchIndex]!,
                  list,
                  baseData.runs[view],
                  filters
                )
              );
            }
          }

          await Promise.all(promises);
        }
      }
    },
    [
      baseData,
      dailyList,
      dailyTriggered,
      fetchDailyPrices,
      fetchHourlyPrices,
      filters,
      hourlyList,
      hourlyTriggered,
      view,
    ]
  );

  // this effect should run only for baseData change
  // it will reset all data loaded before,
  useEffect(() => {
    setDailyList(undefined);
    setHourlyList(undefined);
    setDailyTriggered({});
    setHourlyTriggered({});
  }, [baseData]);

  // it also load initial dataset
  useEffect(() => {
    const controller = new AbortController();
    // we are waiting for initial products and runs batches to be ready
    const fetchMethod = view === 'Daily' ? fetchDailyPrices : fetchHourlyPrices;
    const triggered = view === 'Daily' ? dailyTriggered : hourlyTriggered;
    if (baseData && !triggered[0] && filters) {
      const batchDateRange = baseData.runsBatches[view][0];
      if (batchDateRange) {
        setIsEmpty(false);
        // load first batch
        const start = batchDateRange[0];
        // end date must be 30min later
        const end = formatRequestDate(
          moment(batchDateRange[1]).add(30, 'minutes')
        );
        fetchMethod(
          regionCode,
          0, // batch index
          [start, end], // dateRange
          baseData.products, // initial product structure
          baseData.runs[view], // runs to get
          filters
        );
      } else {
        setIsEmpty(true);
      }
    }

    return () => {
      controller.abort();
    };
  }, [
    regionCode,
    baseData,
    dailyList,
    dailyTriggered,
    fetchDailyPrices,
    fetchHourlyPrices,
    filters,
    hourlyList,
    hourlyTriggered,
    view,
  ]);

  return {
    hourlyProductsWithPrices: hourlyList,
    dailyProductsWithPrices: dailyList,
    isEmpty,
    isSectionLoaded,
  };
}
