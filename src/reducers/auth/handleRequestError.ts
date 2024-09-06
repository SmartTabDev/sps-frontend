import devLog from 'utils/devLog';
import { AppThunk } from 'types/AppThunk';
import { AxiosError } from 'axios';
import logout from './logout';
import refreshTokens from './refreshTokens';

const isTokenError = (error: any) => {
  const is403 = (error as AxiosError)?.response?.status === 403;
  const isInvalidCubeToken = (error as any)?.response?.error === 'Invalid token';
  const jwtExpired = (error as AxiosError)?.response?.data?.err === 'jwt expired';
  const isTokenExpired = (error as any)?.message === 'Invalid token';
  const result = is403 || isInvalidCubeToken || isTokenExpired;
  devLog('isTokenExpired', isTokenExpired);
  devLog('is403', is403);
  devLog('isInvalidCubeToken', isInvalidCubeToken);
  devLog('jwtExpired', jwtExpired);

  return result;
};

const logoutOrRefresh = (rememberMe: boolean): AppThunk => async (dispatch) => {
  if (rememberMe) {
    devLog('remember me');
    dispatch(refreshTokens());
  } else {
    devLog('logout');
    dispatch(logout());
  }
};

const handleRequestError = (error: any, fnName: string): AppThunk => async (
  dispatch,
  getState,
) => {
  devLog('-----');
  devLog('handle error in', fnName);
  devLog(error, JSON.stringify(error));

  const {
    auth: { rememberMe },
  } = getState();

  if (error && isTokenError(error)) {
    dispatch(logoutOrRefresh(rememberMe));
  }

  devLog('-----');

  return error;
};

export default handleRequestError;
