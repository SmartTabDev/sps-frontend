import { Query } from '@cubejs-client/core';
import moment from 'moment';
import { newCubejsApi } from 'api';
import uniq from 'lodash/uniq';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getRandomColor from 'utils/colors/getRandomColor';
import handleRequestError from 'reducers/auth/handleRequestError';
import { ProductMonitorRetailer, ProductMonitorRun } from '../types';

interface Serie {
  name: string;
  type: 'line';
  step: 'end';
  data: any[];
}

interface Hook {
  chartData?: {
    colors: string[];
    legend: {
      data: string[];
    };
    series: Serie[];
    xAxis: {
      data: string[];
      type: 'category';
    };
  };
}

export function getQueryChartData(
  productId: number,
  retailers: ProductMonitorRetailer[],
  runs: ProductMonitorRun[]
): Query {
  return {
    dimensions: [
      'Variants_prm.price',
      'Variants_prm.retailerId',
      'Variants_prm.runId',
      'Variants_prm.createdAt',
    ],
    filters: [
      {
        dimension: 'Variants_prm.productId',
        operator: 'equals',
        values: [productId.toString()],
      },
      {
        dimension: 'Variants_prm.retailerId',
        operator: 'equals',
        values: retailers.map((retailer) => retailer.id.toString()),
      },
      {
        dimension: 'Variants_prm.runId',
        operator: 'equals',
        values: runs.map((run) => run.id.toString()),
      },
    ],
    order: {
      'Variants_prm.runId': 'asc',
    },
  };
}

function mapRowsToChartData(
  rows: any[],
  runs: ProductMonitorRun[],
  retailers: ProductMonitorRetailer[]
): Hook['chartData'] {
  let xAxisData: string[] = [];
  const retailerPrices: Record<string, number[]> = {};
  rows.forEach((row) => {
    xAxisData.push(row['Variants_prm.runId']);
    if (!retailerPrices[row['Variants_prm.retailerId']]) {
      retailerPrices[row['Variants_prm.retailerId']] = [];
    }
    const retailer = retailerPrices[row['Variants_prm.retailerId']]!;
    retailer.push(row['Variants_prm.price']);
  });
  xAxisData = uniq(xAxisData).map(
    (runId) => runs.find((r) => r.id === runId)!.createdAt
  );
  const series = Object.keys(retailerPrices).map(
    (retailerId): Serie => ({
      name: retailers.find((r) => r.id === +retailerId)!.name,
      step: 'end',
      type: 'line',
      data: retailerPrices[retailerId]!,
    })
  );
  return {
    colors: series.map((_, index) => getRandomColor(index)),
    legend: { data: series.map((s) => s.name) },
    series,
    xAxis: {
      data: xAxisData,
      type: 'category',
    },
  };
}

function filterRunsToFetch(runs: ProductMonitorRun[]): ProductMonitorRun[] {
  const filteredRuns: ProductMonitorRun[] = [];

  let prevRun: ProductMonitorRun;
  let prevDay = -1;
  const lastDate = moment(Date.now()).subtract(14, 'days').toDate();

  [...runs].reverse().forEach((run) => {
    const currentDate = new Date(run.createdAt);
    if (lastDate < currentDate) {
      const currentDay = currentDate.getDay();
      if (prevRun && prevDay !== currentDay) {
        filteredRuns.push(prevRun);
      }
      prevRun = run;
      prevDay = currentDay;
    }
  });

  return filteredRuns;
}

export function useProductMonitorChartData(
  regionCode: string | undefined,
  productId?: number,
  retailers?: ProductMonitorRetailer[],
  runs?: ProductMonitorRun[]
): Hook {
  const dispatch = useDispatch();
  const [chartData, setChartData] = useState<Hook['chartData']>();

  const cubeAccessToken = useSelector(
    (state: RootState) => state.auth.cubeAccessToken
  );

  const fetch = useCallback(
    async (
      regionCode: string | undefined,
      productIdToFetch: number,
      retailersToFetch: ProductMonitorRetailer[],
      runsToFetch: ProductMonitorRun[]
    ) => {
      if (cubeAccessToken) {
        try {
          const res = await newCubejsApi(cubeAccessToken, regionCode).load(
            getQueryChartData(productIdToFetch, retailersToFetch, runsToFetch)
          );
          const rows = res.rawData();
          setChartData(mapRowsToChartData(rows, runsToFetch, retailersToFetch));
        } catch (error) {
          dispatch(handleRequestError(error, 'fetchProductMonitorChartData'));
        }
      }
    },
    [cubeAccessToken, dispatch]
  );

  useEffect(() => {
    if (productId && retailers && runs) {
      fetch(regionCode, productId, retailers, filterRunsToFetch(runs));
    }
  }, [regionCode, productId, retailers, runs, fetch]);

  return {
    chartData,
  };
}
