import { fetchAvailabilityDetails } from 'api/KPI/ProductAvailability/fetchAvailabilityDetails';
import { AppThunk } from 'types/AppThunk';
import { setAvailabilityDetails, setTableLoading } from '.';
import handleRequestError from '../auth/handleRequestError';

const getAvailabilityDetails =
  (regionCode: string | undefined, filter: string | undefined): AppThunk =>
  async (dispatch, getState) => {
    try {
      const {
        auth: { cubeAccessToken },
      } = getState();
      dispatch(setTableLoading(true));

      const availabilityDetails = await fetchAvailabilityDetails(
        cubeAccessToken,
        regionCode,
        filter
      );
      dispatch(setAvailabilityDetails(availabilityDetails));
    } catch (error) {
      dispatch(handleRequestError(error, 'getAvailabilityDetails'));
    } finally {
      dispatch(setTableLoading(false));
    }
  };

export default getAvailabilityDetails;
