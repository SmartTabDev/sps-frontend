import { AppThunk } from 'types/AppThunk';
import { authApi } from 'api';
import { setAccess, setLoginLoading } from './actions';
import logout from './logout';
import { loginError } from './loginError';

export const getServicesAccess = (): AppThunk => async (dispatch, getState) => {
  try {
    const {
      data: { services },
    } = await authApi({
      method: 'get',
      url: '/auth/access',
      headers: {
        accesstoken: getState().auth.accessToken,
      },
    });

    dispatch(setAccess(services));
    dispatch(setLoginLoading(false));
  } catch (error) {
    dispatch(loginError(error as any));
    dispatch(logout());
  }
};

export default getServicesAccess;
