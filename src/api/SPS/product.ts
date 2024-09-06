import getCubeName from 'utils/getCubeName';
import { newCubejsApi } from '../index';

export const getPriceDrilldown = async (
  accessToken: string,
  regionCode: string | undefined,
  productId: string | undefined = ''
): Promise<any> => {
  const Variants = getCubeName('Variants');

  const resultSet = await newCubejsApi(accessToken, regionCode).load({
    dimensions: [
      `${Variants}.productname`,
      `${Variants}.retailername`,
      `${Variants}.rundate`,
      `${Variants}.pageProductName`,
      `${Variants}.url`,
      `${Variants}.available`,
      `${Variants}.price`,
    ],
    filters: [
      {
        dimension: `${Variants}.productid`,
        operator: 'equals',
        values: [productId],
      },
    ],
    order: {
      [`${Variants}.rundate`]: 'asc',
      [`${Variants}.retailername`]: 'asc',
      [`${Variants}.productname`]: 'asc',
    },
    timeDimensions: [
      {
        dimension: `${Variants}.rundate`,
        dateRange: 'today',
      },
    ],
  });

  return resultSet;
};

export const getPriceDrilldownRange = async (
  accessToken: string,
  regionCode: string | undefined,
  productId: string | undefined = ''
): Promise<any> => {
  const Variants = getCubeName('Variants');

  const resultSet = await newCubejsApi(accessToken, regionCode).load({
    dimensions: [`${Variants}.retailername`],
    filters: [
      {
        dimension: `${Variants}.productid`,
        operator: 'equals',
        values: [productId],
      },
    ],
    order: {
      [`${Variants}.rundate`]: 'asc',
    },
    measures: [`${Variants}.minPrice`, `${Variants}.maxPrice`],
    timeDimensions: [
      {
        dimension: `${Variants}.rundate`,
        dateRange: 'from 7 days ago to now',
      },
    ],
  });

  return resultSet;
};

export const getSPSVariants = async (
  accessToken: string,
  regionCode: string | undefined,
  dateRange: [string, string],
  productId: string | undefined = ''
): Promise<any> => {
  const Variants = getCubeName('Variants');

  const resultSet = await newCubejsApi(accessToken, regionCode).load({
    dimensions: [
      `${Variants}.productname`,
      `${Variants}.productid`,
      `${Variants}.retailername`,
      // `${Variants}.variantlinkid`,
      `${Variants}.rundate`,
      `${Variants}.price`,
    ],
    filters: [
      {
        dimension: `${Variants}.productid`,
        operator: 'equals',
        values: [productId],
      },
    ],
    order: {
      [`${Variants}.rundate`]: 'asc',
      [`${Variants}.retailername`]: 'asc',
      [`${Variants}.productname`]: 'asc',
    },
    timeDimensions: [
      {
        dimension: `${Variants}.rundate`,
        dateRange,
      },
    ],
  });

  return resultSet;
};

export const getProductAdditionalData = async (
  accessToken: string,
  regionCode: string | undefined,
  dateRange: [string, string],
  productName: string
): Promise<any> => {
  const Variants = getCubeName('Variants');

  const resultSet = await newCubejsApi(accessToken, regionCode).load({
    dimensions: [
      `${Variants}.retailername`,
      `${Variants}.available`,
      `${Variants}.rundate`,
      `${Variants}.url`,
      `${Variants}.pageProductName`,
    ],
    filters: [
      {
        dimension: `${Variants}.productname`,
        operator: 'equals',
        values: [productName],
      },
    ],
    order: {
      [`${Variants}.retailername`]: 'asc',
      [`${Variants}.rundate`]: 'asc',
      [`${Variants}.pageProductName`]: 'asc',
      [`${Variants}.url`]: 'asc',
      [`${Variants}.available`]: 'asc',
    },
    timeDimensions: [
      {
        dimension: `${Variants}.rundate`,
        dateRange,
      },
    ],
  });

  return resultSet;
};
