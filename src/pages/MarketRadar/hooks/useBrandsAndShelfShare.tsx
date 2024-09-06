import * as Cube from '@cubejs-client/core';
import * as React from 'react';
import * as Api from 'api';
import { useDispatch, useSelector } from 'react-redux';
import handleRequestError from 'reducers/auth/handleRequestError';
import getCubeName from 'utils/getCubeName';
import { formatChartDate } from 'utils/dates/formatChartDate';
import { sanitizeName } from '../utils/sanitizeName';
import { MarketRadarFilters } from '../components/ExpandedFilters/ExpandedFilters';
import {
  calculateShareOfShelf,
  ShareOfShelf,
} from '../utils/calculateShareOfShelf';

const Products = getCubeName('Products', 'aggregations');
const QUERY_HISTORY_LIMIT = 30000;

interface TopTenCategories {
  value: number;
  key: string;
}

export type TopBrandsTableRow = {
  retailername: string;
  categoryname: string;
  brandname: string;
  share: number;
  isOdd: boolean;
};

export function getQueryHistory(
  _granularity: Cube.TimeDimensionGranularity,
  timeDimension: MarketRadarFilters['timeDimension'],
  retailers: MarketRadarFilters['selectedRetailers'],
  categories: MarketRadarFilters['selectedCategories']
): Cube.Query {
  return {
    measures: [`${Products}.allCountSum`],
    dimensions: [
      `${Products}.formattedbrand`,
      `${Products}.category`,
      `${Products}.retailer`,
    ],
    order: {
      [`${Products}.allCountSum`]: 'desc',
    },
    timeDimensions: [
      {
        dimension: `${Products}.runtime`,
        granularity: 'month',
        dateRange: timeDimension.name,
      },
    ],
    limit: QUERY_HISTORY_LIMIT,

    filters: [
      ...(retailers.length
        ? [
            {
              dimension: `${Products}.retailer`,
              operator: 'equals',
              values: retailers.map((v) => v.name),
            },
          ]
        : ([] as any)),
      ...(categories.length
        ? [
            {
              dimension: `${Products}.category`,
              operator: 'equals',
              values: categories.map((v) => v.name),
            },
          ]
        : ([] as any)),
    ],
  };
}

function processData(rawData: any[]): ShareOfShelf[] {
  return rawData.map((item) => ({
    brand: item?.[`${Products}.formattedbrand`],
    category: item?.[`${Products}.category`],
    date: formatChartDate(item?.[`${Products}.runtime`]),
    formattedBrand: item?.[`${Products}.formattedbrand`],
    formattedCategory: sanitizeName(item?.[`${Products}.category`]),
    formattedRetailer: sanitizeName(item?.[`${Products}.retailer`]),
    retailer: item?.[`${Products}.retailer`],
    runtime: item?.[`${Products}.runtime`],
    value: item?.[`${Products}.allCountSum`] || 0,
  }));
}

interface GroupedShareOfShelf {
  [formattedRetailer: string]: {
    name: string;
    data: {
      [formattedCategory: string]: {
        data: {
          value: number;
          name: string;
          brandShareForRetailer?: number;
          brandShareForCategory?: number;
        }[];
        name: string;
        totalValue: number;
      };
    };
  };
}

function groupShareOfShelf(data: ShareOfShelf[]): GroupedShareOfShelf {
  return data.reduce(
    (accumulator: GroupedShareOfShelf, shareOfShelf: ShareOfShelf) => {
      const {
        formattedRetailer,
        formattedCategory,
        category,
        retailer,
        brand,
        value,
      } = shareOfShelf;

      if (formattedRetailer && !accumulator[formattedRetailer]) {
        accumulator[formattedRetailer] = { data: {}, name: '' };
        accumulator[formattedRetailer]!.data[formattedCategory] = {
          data: [],
          totalValue: 0,
          name: '',
        };
      }

      if (!accumulator[formattedRetailer]!.data[formattedCategory]) {
        accumulator[formattedRetailer]!.data[formattedCategory] = {
          data: [],
          totalValue: 0,
          name: '',
        };
      }

      const brandsArrLength =
        accumulator[formattedRetailer]!.data[formattedCategory]!.data.length;

      if (brandsArrLength < 3) {
        accumulator[formattedRetailer]!.name = retailer;
        accumulator[formattedRetailer]!.data[formattedCategory]!.name =
          category;
        accumulator[formattedRetailer]!.data[formattedCategory]!.data.push({
          name: brand,
          value,
        });
      }

      return accumulator;
    },
    {}
  );
}

function sliceGrupedShare(data: GroupedShareOfShelf): GroupedShareOfShelf {
  Object.keys(data).forEach((retailerKey) => {
    const retailer = data[retailerKey];
    let topTenCategoriesKeys: TopTenCategories[] = [];

    if (retailer) {
      Object.keys(retailer.data).forEach((categoryKey) => {
        const category = retailer && retailer.data[categoryKey];
        const categoryTotalValue =
          category &&
          category.data.reduce(
            (accumulator, brand) => accumulator + brand.value,
            0
          );

        data[retailerKey]!.data[categoryKey]!.totalValue =
          categoryTotalValue || 0;

        topTenCategoriesKeys.push({
          value: categoryTotalValue as number,
          key: categoryKey,
        });
        topTenCategoriesKeys.sort((a, b) => b.value - a.value);

        topTenCategoriesKeys = topTenCategoriesKeys.slice(0, 10);
      });
    }

    if (retailer) {
      Object.keys(retailer.data).forEach((categoryKey) => {
        const isCategoryInTopTen = topTenCategoriesKeys.find(
          (obj) => obj.key === categoryKey
        );

        if (!isCategoryInTopTen) delete data[retailerKey]!.data[categoryKey];
      });
    }
  });

  return data;
}

function getChartData(groupedData: GroupedShareOfShelf): any[] {
  const chartData: any[] = [];

  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const retailerKey in groupedData) {
    const retailerChildren = [];
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const categoryKey in groupedData[retailerKey]!.data) {
      const categoryData = groupedData[retailerKey]!.data[categoryKey];
      const categoryName = categoryData!.name;
      const categoryValue = categoryData!.totalValue;
      const brands = categoryData!.data;
      const categoryChildren = brands.map((brand) => ({
        name: brand.name,
        value: brand.value,
      }));

      retailerChildren.push({
        name: categoryName,
        value: categoryValue,
        children: categoryChildren,
      });
    }

    chartData.push({
      name: groupedData[retailerKey]!.name,
      children: retailerChildren,
    });
  }

  return chartData;
}

function getTableData(groupedData: GroupedShareOfShelf): TopBrandsTableRow[] {
  const tableData: TopBrandsTableRow[] = [];

  let retailerIndex = 0;

  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const retailerKey in groupedData) {
    const retailerName = groupedData[retailerKey]!.name;
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const categoryKey in groupedData[retailerKey]!.data) {
      const categoryData = groupedData[retailerKey]!.data[categoryKey];
      const categoryName = categoryData!.name;

      const brands = categoryData!.data;

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < brands.length; i++) {
        tableData.push({
          retailername: retailerName,
          categoryname: categoryName,
          share: 0,
          brandname: brands[i]?.name || '',
          isOdd: retailerIndex % 2 !== 0,
        });
      }
    }

    retailerIndex += 1;
  }

  return tableData;
}

export function useBrandsAndShelfShare(
  regionCode: string | undefined,
  granularity: Cube.TimeDimensionGranularity,
  timeDimension: MarketRadarFilters['timeDimension'],
  retailers: MarketRadarFilters['selectedRetailers'],
  categories: MarketRadarFilters['selectedCategories']
): {
  isLoading: boolean;
  chartData: any[];
  tableData: TopBrandsTableRow[];
} {
  const dispatch = useDispatch();
  const [chartData, setChartData] = React.useState<any[]>([]);
  const [tableData, setTableData] = React.useState<TopBrandsTableRow[]>([]);
  const [isLoading, setLoading] = React.useState<boolean>(true);

  const cubeAccessToken = useSelector(
    (state: RootState) => state.auth.cubeAccessToken
  );

  const fetchShare = React.useCallback(
    async (
      regionCodeToFetch: string | undefined,
      granularityToFetch: Cube.TimeDimensionGranularity,
      timeDimensionToFetch: MarketRadarFilters['timeDimension'],
      retailersToFetch: MarketRadarFilters['selectedRetailers'],
      categoriesToFetch: MarketRadarFilters['selectedCategories']
    ) => {
      if (cubeAccessToken) {
        setLoading(true);

        try {
          const res = await Api.newCubejsApi(
            cubeAccessToken,
            regionCodeToFetch
          ).load(
            getQueryHistory(
              granularityToFetch,
              timeDimensionToFetch,
              retailersToFetch,
              categoriesToFetch
            )
          );

          const rawData = res.rawData();
          const data = processData(rawData);

          const shares = calculateShareOfShelf(data);
          const groupedShare = groupShareOfShelf(data);

          const slicedGroupedShare = sliceGrupedShare(groupedShare);
          const chartOptionData = getChartData(slicedGroupedShare);
          const tableValues = getTableData(slicedGroupedShare);

          const tableValuesWithShares = tableValues.map((row) => {
            const share = shares.find(
              (obj) =>
                obj.retailer === row.retailername &&
                obj.category === row.categoryname &&
                obj.brand === row.brandname
            );

            return {
              ...row,
              share: share?.share || 0,
            };
          });

          setTableData(tableValuesWithShares);
          setChartData(chartOptionData);
          setTableData(tableValuesWithShares);

          setLoading(false);
        } catch (error) {
          dispatch(handleRequestError(error, 'fetchShelfShare'));
          setLoading(false);
        }
      }
    },
    [cubeAccessToken, dispatch]
  );

  React.useEffect(() => {
    if (regionCode && granularity && timeDimension) {
      fetchShare(regionCode, granularity, timeDimension, retailers, categories);
    }
  }, [
    regionCode,
    granularity,
    timeDimension,
    fetchShare,
    retailers,
    categories,
  ]);

  return {
    chartData,
    tableData,
    isLoading,
  };
}
