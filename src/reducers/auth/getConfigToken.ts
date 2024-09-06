import { AppThunk } from 'types/AppThunk';
import { authApi } from 'api';
import { setConfigAccessToken } from './actions';
import { loginError } from './loginError';

const getConfigToken = (): AppThunk => async (dispatch, getState) => {
  try {
    const {
      data: { access },
    } = await authApi({
      method: 'get',
      url: '/config/access',
      headers: {
        accesstoken: getState().auth.accessToken,
      },
    });

    dispatch(setConfigAccessToken(access));
  } catch (error) {
    dispatch(loginError(error as any));
  }
};

export default getConfigToken;
