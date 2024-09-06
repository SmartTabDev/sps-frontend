import getCubeName from 'utils/getCubeName';
import moment from 'moment';
import entries from 'lodash/entries';
import groupBy from 'lodash/groupBy';
import { Product } from 'types/Product';
import {
  AvailabilityHistory,
  AvailabilityStatus,
} from 'reducers/productAvailability';
import { formatShortDate } from 'components/FormatDate/FormatDate';
import { newCubejsApi } from 'api';
import getDimensionKeys from 'utils/cube/getDimensionKeys';
import { getAvailabilityStatus } from '../utils/getAvailability';

export const getAvailabilityHistoryRequest = async (
  accessToken: string,
  regionCode: string | undefined,
  dateRange: string | [string, string]
): Promise<AvailabilityHistory> => {
  const Products = getCubeName('Products', 'kpi');

  const resultSet = await newCubejsApi(accessToken, regionCode).load({
    dimensions: [
      `${Products}.productid`,
      `${Products}.variantlinkid`,
      `${Products}.available`,
      `${Products}.ispageavailable`,
    ],
    timeDimensions: [
      {
        dimension: `${Products}.rundate`,
        granularity: 'day',
        dateRange,
      },
    ],
  });

  const rawData = resultSet.rawData();
  const parsedData = rawData.map((data) => getDimensionKeys(data));
  const dataWithStatus = parsedData.map((data) => ({
    ...data,
    status: getAvailabilityStatus(data),
  }));

  const groupedDataByRun = entries(
    groupBy<Product & { status: AvailabilityStatus }>(dataWithStatus, 'rundate')
  );

  const availability: AvailabilityHistory = Object.fromEntries(
    groupedDataByRun.map(([date, products]) => [
      [formatShortDate(moment(date), true)],
      products.reduce(
        (acc, { variantlinkid, status }) => ({
          ...acc,
          ...{
            [variantlinkid]: {
              status,
            },
          },
        }),
        {}
      ),
    ])
  );

  return availability;
};
