import { AxiosRequestConfig } from 'axios';
import decode from 'jwt-decode';
import moment from 'moment';

const validateToken = (token: string): boolean => {
  if (token) {
    const decoded = decode<{exp: number}>(token);

    if (decoded && typeof decoded !== 'string') {
      const { exp } = decoded;

      if (exp) {
        const isExpired = moment().unix() > exp;

        if (isExpired) {
          return false;
        }
      }
    }
  }

  return true;
};

const getAccessToken = (options: AxiosRequestConfig): string | undefined => {
  const { headers } = options;

  if (headers && headers.accesstoken) {
    return headers.accesstoken;
  }

  return undefined;
};

export { validateToken, getAccessToken };
