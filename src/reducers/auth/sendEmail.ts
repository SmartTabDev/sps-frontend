import { authApi } from 'api';
import { AppThunk } from 'types/AppThunk';
import { setLoginLoading, setEmailSent, setEmailSentError } from './actions';

const sendEmail = (email: string): AppThunk => async (dispatch) => {
  dispatch(setLoginLoading(true));
  dispatch(setEmailSent(false));

  try {
    const {
      data: { ans },
    } = await authApi({
      method: 'post',
      url: '/auth/password/forgot',
      data: {
        email,
      },
    });

    if (ans === 'Email sent') {
      dispatch(setEmailSent(true));
    }
  } catch (error) {
    dispatch(setEmailSentError('Cannot send email'));
  }

  dispatch(setLoginLoading(false));
};

export default sendEmail;
