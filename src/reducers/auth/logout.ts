import { AppThunk } from 'types/AppThunk';
import { authApi } from 'api';
import storeRegistry from 'storeRegistry';
import { history } from 'pages/history';
import { setLogout } from './actions';

const logout = (): AppThunk => async (
  dispatch,
  getState,
) => {
  try {
    await authApi({
      method: 'get',
      url: '/auth/logout',
      headers: {
        accesstoken: getState().auth.accessToken,
      },
    });
  } catch (error) {
    //
  } finally {
    dispatch(setLogout());
    await storeRegistry.getStorePersistor().purge();
    history.push('/');
  }
};

export default logout;
