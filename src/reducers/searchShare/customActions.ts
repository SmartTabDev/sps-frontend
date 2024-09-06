import { AppThunk } from 'types/AppThunk';
import { getSearchShareDetails } from 'api/KPI/SearchShare/getSearchShareDetails';
import handleRequestError from '../auth/handleRequestError';
import {
  setSearchShareLoading,
  setSearchShareDetails,
  setSelectedSearchShareDetails,
} from './actions';

const setSelectedDetails = (details: any[]): AppThunk => async (dispatch) => {
  if (details.length) {
    dispatch(
      setSelectedSearchShareDetails({
        keywordId: details[0].keywordid,
        retailerId: details[0].retailerid,
      }),
    );
  }
};

// eslint-disable-next-line max-len
export const getSearchShare = (regionCode: string | undefined): AppThunk => async (dispatch, getState) => {
  try {
    const {
      auth: { cubeAccessToken },
      config: {
        kpi: { searchRetailers },
      },
    } = getState();
    const retailerIds = searchRetailers.map((r) => String(r.id));

    if (retailerIds.length) {
      dispatch(setSearchShareLoading(true));
      const details = await getSearchShareDetails(cubeAccessToken, regionCode, retailerIds);
      dispatch(setSearchShareDetails(details));
      dispatch(setSelectedDetails(details));
    }
  } catch (error) {
    dispatch(handleRequestError(error, 'getSearchShare'));
  } finally {
    dispatch(setSearchShareLoading(false));
  }
};
