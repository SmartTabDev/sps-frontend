import { authApi } from 'api';
import { AppThunk } from 'types/AppThunk';
import { setLoginLoading, setPasswordChanged, setPasswordChangeError } from './actions';

const setNewPassword = (
  password: string,
  resetToken: string,
): AppThunk => async (dispatch) => {
  dispatch(setLoginLoading(true));
  dispatch(setPasswordChanged(false));

  try {
    await authApi({
      method: 'post',
      url: '/auth/password/reset',
      data: {
        password,
        resetToken,
      },
    });

    dispatch(setPasswordChanged(true));
  } catch (error) {
    if ((error as any).response) {
      // Request made and server responded
      const { err, ans } = (error as any).response.data;
      dispatch(setPasswordChangeError(ans || err));
    } else if ((error as any).request) {
      // The request was made but no response was received
    } else {
      // Something happened in setting up the request that triggered an Error
      dispatch(setPasswordChangeError('Cannot set new password'));
    }
  }

  dispatch(setLoginLoading(false));
};

export default setNewPassword;
