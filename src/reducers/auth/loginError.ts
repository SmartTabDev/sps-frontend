import { AxiosError } from 'axios';
import { AppThunk } from 'types/AppThunk';
import { setLoginLoading, setError } from './actions';
import logout from './logout';

const getErrorMessage = (error: any) => {
  const result = error?.response?.data?.err?.message || error?.response?.data?.err;

  return result;
};

export const loginError = (error: AxiosError): AppThunk => async (dispatch) => {
  dispatch(setLoginLoading(false));
  const message = getErrorMessage(error);

  if (message) {
    dispatch(setError(message));
  } else {
    dispatch(setError('Something went wrong. Try again.'));
    dispatch(logout());
  }
};
