import getSchedule from 'api/SPS/getSchedule';
import handleRequestError from 'reducers/auth/handleRequestError';
import { AppThunk } from 'types/AppThunk';
import { setViewOptions } from './actions';

export const init = (configId: number | undefined): AppThunk => async (dispatch, getState) => {
  try {
    const { configAccessToken } = getState().auth;
    const isDaily = await getSchedule(configAccessToken, configId);
    let viewOptions;

    if (isDaily) {
      viewOptions = ['Daily'];
    } else {
      viewOptions = ['Daily', 'Hourly'];
    }

    dispatch(setViewOptions(viewOptions));
  } catch (error) {
    dispatch(handleRequestError(error, 'init'));
  }
};
