import cubejs, {
  CubejsApi,
  DeeplyReadonly,
  HttpTransport,
  Query,
} from '@cubejs-client/core';
import axios, { AxiosRequestConfig } from 'axios';
import { getAccessToken, validateToken } from 'utils/validateToken';
import getDimensionKeys from 'utils/cube/getDimensionKeys';

const {
  REACT_APP_CUBE_JS_API = '',
  REACT_APP_AUTH_API = '',
  REACT_APP_CONFIG_API = '',
  REACT_APP_NOTIFICATION_API = '',
} = process.env;

export const cubejsApi = (
  accessToken = '',
  requestId = ''
): ReturnType<typeof cubejs> =>
  cubejs(accessToken, {
    apiUrl: REACT_APP_CUBE_JS_API,
    headers: {
      'x-request-id': requestId,
    },
    transport: new HttpTransport({
      apiUrl: REACT_APP_CUBE_JS_API,
      authorization: accessToken,
      headers: {
        'x-request-id': requestId,
      },
      method: 'POST',
    }),
  });

export const newCubejsApi = (
  accessToken = '',
  regionCode = '',
  requestId = '',
  headers = {}
): ReturnType<typeof cubejs> =>
  cubejs(accessToken, {
    apiUrl: REACT_APP_CUBE_JS_API,
    headers: {
      'x-request-id': requestId,
      region: regionCode,
      ...headers,
    },
    transport: new HttpTransport({
      apiUrl: REACT_APP_CUBE_JS_API,
      authorization: accessToken,
      headers: {
        'x-request-id': requestId,
        region: regionCode,
        ...headers,
      },
      method: 'POST',
    }),
  });

export const cubejsApiRetry = async <T>(
  api: CubejsApi,
  query: DeeplyReadonly<Query | Query[]>
): Promise<T[]> => {
  const res = await api.load(query, {
    progressCallback: () => {
      //   console.log(result, 'result');
    },
  });

  const parsedData = res.rawData().map((data) => getDimensionKeys(data));

  return parsedData;
};

const createApi =
  (baseUrl: string) =>
  async (config: AxiosRequestConfig, refreshToken = false) => {
    let isValidAccessToken = true;

    try {
      const token = getAccessToken(config);

      if (token) {
        isValidAccessToken = validateToken(token);
      }
    } catch (error) {
      console.log(error, 'token validation error');
    }

    if (isValidAccessToken === false && refreshToken === false) {
      throw new Error('Invalid token');
    }

    return axios({ ...config, url: `${baseUrl}${config.url}` });
  };

export const authApi = createApi(REACT_APP_AUTH_API);
export const configApi = createApi(REACT_APP_CONFIG_API);
export const prmApi = createApi(REACT_APP_CONFIG_API);
export const notificationApi = createApi(REACT_APP_NOTIFICATION_API);
