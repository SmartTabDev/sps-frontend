import { AppThunk } from 'types/AppThunk';
import { getAvailabilityHistoryRequest } from 'api/KPI/ProductAvailability/getAvailabilityHistoryRequest';
import handleRequestError from '../auth/handleRequestError';
import { setAvailabilityHistory } from '.';

const getAvailabilityHistory =
  (
    regionCode: string | undefined,
    dateRange: string | [string, string]
  ): AppThunk =>
  async (dispatch, getState) => {
    try {
      const {
        auth: { cubeAccessToken },
      } = getState();

      const availabilityHistory = await getAvailabilityHistoryRequest(
        cubeAccessToken,
        regionCode,
        dateRange
      );
      dispatch(setAvailabilityHistory(availabilityHistory));
    } catch (error) {
      dispatch(handleRequestError(error, 'getAvailabilityHistory'));
    } finally {
      //
    }
  };

export default getAvailabilityHistory;
