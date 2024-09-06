import getCubeName from 'utils/getCubeName';
import { newCubejsApi } from 'api';
import getDimensionKeys from 'utils/cube/getDimensionKeys';

export const fetchAvailabilityDetails = async (
  accessToken: string,
  regionCode: string | undefined,
  filter: string | undefined
) => {
  const Products = getCubeName('Products', 'kpi');

  const resultSet = await newCubejsApi(accessToken, regionCode).load({
    dimensions: [
      `${Products}.productid`,
      `${Products}.categoryid`,
      `${Products}.retailerid`,
      `${Products}.productname`,
      `${Products}.url`,
      `${Products}.ispageavailable`,
      `${Products}.available`,
      `${Products}.variantlinkid`,
    ],
    timeDimensions: [
      {
        dimension: `${Products}.rundate`,
        granularity: 'day',
        dateRange: 'Today',
      },
    ],
    order: {
      [`${Products}.productid`]: 'asc',
    },
    filters: filter
      ? [
          {
            or: [
              {
                member: `${Products}.productname`,
                operator: 'contains',
                values: [filter],
              },
            ],
          },
        ]
      : [],
  });

  const rawData = resultSet.rawData();
  const parsedData = rawData.map((data) => getDimensionKeys(data));

  return parsedData;
};
