import { AppThunk } from 'types/AppThunk';
import handleRequestError from 'reducers/auth/handleRequestError';
import { formatRequestDate } from 'components/FormatDate/FormatDate';
import { getClientVariants, createFilters } from 'api/SPS/records';
import moment from 'moment';
import { productComparisonSlice } from './productComparison';

export const {
  resetVariants,
  setChart,
  setChartLoading,
  setClientRuns,
  setDate,
  setInitialForm,
  setRunsLoading,
  setSelectedProducts,
  setSelectedRetailers,
  setShowBy,
  setTableView,
  setTableViewOptions,
  setVariants,
  setVariantsLoaded,
  setVariantsLoading,
} = productComparisonSlice.actions;

export const getRecords =
  (regionCode: string | undefined): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setVariantsLoading(true));

    const {
      productComparison: {
        startDate,
        endDate,
        selectedProducts,
        selectedRetailers,
      },
      auth: { cubeAccessToken },
    } = getState();
    const newEndDate = formatRequestDate(moment(endDate).add(30, 'minutes'));
    const dateRange: [string, string] = [startDate, newEndDate];

    const offset = Number(process.env.REACT_APP_CUBE_JS_LIMIT) || 5000;
    let currentOffset = 0;
    let shouldFetch = true;

    const filters = createFilters({
      retailers: selectedRetailers,
      brands: [],
      categories: [],
      products: selectedProducts,
    });

    if (startDate && endDate) {
      do {
        try {
          // eslint-disable-next-line no-await-in-loop
          const clientVariants = await getClientVariants(
            cubeAccessToken,
            regionCode,
            dateRange,
            currentOffset,
            offset,
            filters
          );

          if (clientVariants.length > 0) {
            dispatch(setVariants(clientVariants));
            currentOffset += offset;
          } else {
            shouldFetch = false;
          }
        } catch (error) {
          console.log(error, 'error');
          dispatch(handleRequestError(error, 'getRecords'));
          shouldFetch = false;
        }
      } while (shouldFetch === true);
    }

    dispatch(setVariantsLoading(false));
    dispatch(setVariantsLoaded(true));
  };
