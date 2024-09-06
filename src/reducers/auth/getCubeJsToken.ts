import { AppThunk } from 'types/AppThunk';
import { authApi } from 'api';
import { loginError } from './loginError';
import { setCubeAccessToken, setLoginLoading } from './actions';

const getCubeJsToken = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setLoginLoading(true));
    const {
      data: { access, refresh },
    } = await authApi({
      method: 'get',
      url: '/cubejs/access',
      headers: {
        accesstoken: getState().auth.accessToken,
      },
    });

    dispatch(setCubeAccessToken({ access, refresh }));
  } catch (error) {
    dispatch(loginError(error as any));
  }
};

export default getCubeJsToken;
