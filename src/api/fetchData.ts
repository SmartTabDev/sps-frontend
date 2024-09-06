import axios, { AxiosRequestConfig } from 'axios';

const { REACT_APP_SERVER_API = '' } = process.env;

const createFetchData = (apiPrefix: string) => {
  return async <Response>(
    relativeUrl: string,
    config?: AxiosRequestConfig
  ): Promise<Response> => {
    const response = await axios.get<Response>(
      `${apiPrefix}${relativeUrl}`,
      config
    );
    return response.data;
  };
};

export const fetchAppServerApiData = createFetchData(REACT_APP_SERVER_API);

export interface ApiResponse<T> {
  status: string;
  data: T;
}
