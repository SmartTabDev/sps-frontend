import { AppThunk } from 'types/AppThunk';
import { authApi } from 'api';
import { setCognitoTokens, setRefreshTokensLoading } from './actions';
import getConfigToken from './getConfigToken';
import getServicesAccess from './getServicesAccess';
import getCubeJsToken from './getCubeJsToken';
import logout from './logout';

const refreshTokens = (): AppThunk => async (dispatch, getState) => {
  try {
    const { auth } = getState();

    const {
      refreshTokensLoading,
      refreshToken: oldRefreshToken,
      accessToken: oldAccessToken,
    } = auth;

    const data = {
      refreshToken: oldRefreshToken,
    };

    if (refreshTokensLoading === false) {
      dispatch(setRefreshTokensLoading(true));

      const {
        data: { accessToken, refreshToken },
      } = await authApi({
        method: 'post',
        url: '/auth/refresh',
        headers: {
          accesstoken: oldAccessToken,
        },
        data,
      }, true);

      dispatch(setCognitoTokens({ accessToken, refreshToken }));
      dispatch(getCubeJsToken());
      dispatch(getServicesAccess());
      dispatch(getConfigToken());
    }
  } catch (error) {
    console.log(error, 'refreshTokens error');
    dispatch(logout());
  } finally {
    dispatch(setRefreshTokensLoading(false));
  }
};

export default refreshTokens;
