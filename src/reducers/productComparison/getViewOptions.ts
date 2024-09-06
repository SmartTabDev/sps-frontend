import { AppThunk } from 'types/AppThunk';
import { setTableViewOptions } from './actions';

export const getViewOptions = (isDaily: boolean): AppThunk => async (
  dispatch,
) => {
  let viewOptions;

  if (isDaily) {
    viewOptions = ['Daily'];
  } else {
    viewOptions = ['Daily', 'Hourly'];
  }

  dispatch(setTableViewOptions(viewOptions));
};
