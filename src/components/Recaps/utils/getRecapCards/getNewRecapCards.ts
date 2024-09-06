import { getPercentage } from 'utils/getPercentage';
import merge from 'lodash/merge';
import last from 'lodash/last';
import { newCubejsApi } from 'api';
import getCubeName, { CubeTableName } from 'utils/getCubeName';
import getDimensionKeys from 'utils/cube/getDimensionKeys';
import { getClientRuns } from 'api/SPS/runs';
import getInitialTimeframe from 'pages/SPS/ProductAnalysis/utils/getInitialTimeframe';
import { RecapCardType } from '../types';

const formatCard = (data: number[], allCount: number) => ({
  value: last(data),
  subtitle: Number(getPercentage(last(data), allCount).toFixed(2)),
  series: [
    {
      name: '',
      data,
    },
  ],
});

const getPriceChange = async (
  accessToken: string,
  regionCode: string | undefined,
  measureTableName: CubeTableName,
  key: 'countDrop' | 'countJump' | 'availableCount' | 'unavailableCount'
) => {
  try {
    const Measure = getCubeName(measureTableName);
    const Variants = getCubeName('Variants');

    const resultSet = await newCubejsApi(accessToken, regionCode).load({
      dimensions: [`${Variants}.rundate`],
      measures: [`${Measure}.${key}`],
      timeDimensions: [
        {
          dimension: `${Variants}.createdat`,
          dateRange: 'from 7 days ago to now',
        },
      ],
      order: {
        [`${Variants}.rundate`]: 'desc',
      },
      limit: 8,
    });

    const rawData = resultSet.rawData();
    const parsedData = rawData.map((data) => getDimensionKeys(data));
    const mappedData = parsedData.map((pd) => ({
      rundate: pd.rundate,
      count: pd[key],
    }));

    return mappedData;
  } catch (error) {
    console.log(error, 'error');
  }

  return [];
};

const getVariantsCount = async (
  accessToken: string,
  regionCode: string | undefined
) => {
  try {
    const Variants = getCubeName('Variants');

    const resultSet = await newCubejsApi(accessToken, regionCode).load({
      dimensions: [`${Variants}.rundate`],
      measures: [`${Variants}.count`],
      timeDimensions: [
        {
          dimension: `${Variants}.rundate`,
          dateRange: 'Today',
        },
      ],
      order: {
        [`${Variants}.rundate`]: 'desc',
      },
      limit: 8,
    });

    const rawData = resultSet.rawData();
    const parsedData = rawData.map((data) => getDimensionKeys(data));

    return parsedData;
  } catch (error) {
    console.log(error, 'error');
  }

  return [];
};

const fillRuns = (
  runs: string[],
  dataSource: { rundate: string; count: number }[]
) => {
  return runs.map((r) => dataSource.find((ds) => ds.rundate === r)?.count ?? 0);
};

const getCommonRecapCardsData = async (
  accessToken: string,
  regionCode: string | undefined,
  intervals: number
) => {
  const dateRange = getInitialTimeframe(intervals);
  const clientRuns = await getClientRuns(
    accessToken,
    regionCode,
    dateRange as [string, string],
    8,
    true
  );

  const runs = [...clientRuns].reverse();

  const variantsCount = await getVariantsCount(accessToken, regionCode);
  const lastRun = last(runs);
  const lastRunVariantsCount = variantsCount.find(
    (vc) => vc.rundate === lastRun
  );

  const count = Number(lastRunVariantsCount?.count || 0);

  return {
    lastRunVariantsCount: count,
    runs,
  };
};

const getPriceJumpsCard = async (
  accessToken: string,
  regionCode: string | undefined,
  runs: string[],
  allCount: number
) => {
  const jumps = await getPriceChange(
    accessToken,
    regionCode,
    'PriceChanges',
    'countJump'
  );

  return merge(
    {},
    {
      name: 'Price jumps',
      color: '#28A745',
      positive: true,
    },
    formatCard(fillRuns(runs, jumps), allCount)
  );
};

const getPriceDropsCard = async (
  accessToken: string,
  regionCode: string | undefined,
  runs: string[],
  allCount: number
) => {
  const drops = await getPriceChange(
    accessToken,
    regionCode,
    'PriceChanges',
    'countDrop'
  );

  return merge(
    {},
    {
      name: 'Price drops',
      color: '#F00F00',
      positive: false,
    },
    formatCard(fillRuns(runs, drops), allCount)
  );
};

const getUnavailableCard = async (
  accessToken: string,
  regionCode: string | undefined,
  runs: string[],
  allCount: number
) => {
  const unavailable = await getPriceChange(
    accessToken,
    regionCode,
    'Variants',
    'unavailableCount'
  );

  return merge(
    {},
    {
      name: 'Unavailable',
      color: '#828282',
      positive: false,
    },
    formatCard(fillRuns(runs, unavailable), allCount)
  );
};

const getAvailableCard = async (
  accessToken: string,
  regionCode: string | undefined,
  runs: string[],
  allCount: number
) => {
  const available = await getPriceChange(
    accessToken,
    regionCode,
    'Variants',
    'availableCount'
  );

  return merge(
    {},
    {
      name: 'Available',
      color: undefined,
      positive: false,
    },
    formatCard(fillRuns(runs, available), allCount)
  );
};

const getRecapCards = async (
  accessToken: string,
  regionCode: string | undefined,
  intervals: number
): Promise<any[]> => {
  const { runs, lastRunVariantsCount: count } = await getCommonRecapCardsData(
    accessToken,
    regionCode,
    intervals
  );

  const result = [
    await getPriceJumpsCard(accessToken, regionCode, runs, count),
    await getPriceDropsCard(accessToken, regionCode, runs, count),
    await getUnavailableCard(accessToken, regionCode, runs, count),
    await getAvailableCard(accessToken, regionCode, runs, count),
  ];

  return result;
};

export {
  getCommonRecapCardsData,
  getPriceJumpsCard,
  getPriceDropsCard,
  getUnavailableCard,
  getAvailableCard,
};

export default getRecapCards;
