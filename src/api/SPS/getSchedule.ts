import { configApi } from 'api';
import { TableView } from 'types/SPSTable';

const getSchedule = async (
  configAccessToken: string,
  configId: number | undefined,
): Promise<TableView[]> => {
  const {
    data: { isDaily },
  } = await configApi({
    method: 'get',
    url: `/sps/config/${configId}/schedule/is-daily`,
    headers: {
      accesstoken: configAccessToken,
    },
  });

  return isDaily;
};

export default getSchedule;
