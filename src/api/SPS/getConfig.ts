import { configApi } from 'api';
import { Config } from 'types/AppConfig';

const getConfig = async (
  configAccessToken: string,
  configId: number | undefined
): Promise<Config> => {
  const { data } = await configApi({
    method: 'get',
    url: `/config/${configId}`,
    headers: {
      accesstoken: configAccessToken,
    },
  });

  return data;
};

export default getConfig;
