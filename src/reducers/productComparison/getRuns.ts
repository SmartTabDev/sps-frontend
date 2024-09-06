import { AppThunk } from 'types/AppThunk';
import { getClientRuns } from 'api/SPS/runs';
import handleRequestError from '../auth/handleRequestError';
import { getRecords, setClientRuns, setRunsLoading } from './actions';

const getRuns =
  (regionCode: string | undefined): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setRunsLoading(true));
      const { startDate, endDate } = getState().productComparison;
      const { cubeAccessToken } = getState().auth;

      if (cubeAccessToken) {
        const dateRange: [string, string] = [startDate, endDate];
        const clientRuns = await getClientRuns(
          cubeAccessToken,
          regionCode,
          dateRange
        );
        dispatch(setClientRuns(clientRuns));
        dispatch(getRecords(regionCode));
      }
    } catch (error) {
      dispatch(handleRequestError(error, 'getRuns'));
    } finally {
      dispatch(setRunsLoading(false));
    }
  };

export default getRuns;
