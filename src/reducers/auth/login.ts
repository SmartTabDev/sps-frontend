import { AppThunk } from 'types/AppThunk';
import { authApi } from 'api';
import {
  setCognitoTokens,
  setLoginChallenge,
  setLoginLoading,
} from './actions';
import getConfigToken from './getConfigToken';
import { getServicesAccess } from './getServicesAccess';
import getCubeJsToken from './getCubeJsToken';
import { loginError } from './loginError';

const loginRequest = async (
  email: string,
  password: string,
  newPassword?: string,
) => {
  const { data } = await authApi({
    method: 'post',
    url: '/auth/login',
    data: {
      email,
      password,
      ...(newPassword ? { newPassword } : {}),
    },
  });

  return data;
};

const login = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setLoginLoading(true));

    const {
      auth: { email, password, newPassword },
    } = getState();
    const { accessToken, refreshToken, challenge } = await loginRequest(
      email,
      password,
      newPassword,
    );

    if (challenge) {
      dispatch(setLoginLoading(false));
      dispatch(setLoginChallenge(true));
    } else {
      dispatch(setLoginChallenge(false));
      dispatch(setCognitoTokens({ accessToken, refreshToken }));
      dispatch(getCubeJsToken());
      dispatch(getConfigToken());
      dispatch(getServicesAccess());
    }
  } catch (error) {
    dispatch(loginError(error as any));
  }
};

export default login;
