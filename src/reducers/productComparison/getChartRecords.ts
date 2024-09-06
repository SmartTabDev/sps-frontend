import { getProducts } from 'api/SPS/getProducts';
import { AppThunk } from 'types/AppThunk';
import handleRequestError from '../auth/handleRequestError';
import { setChart, setChartLoading } from './actions';

const getChartRecords =
  (regionCode: string | undefined): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setChartLoading(true));
      const {
        productComparison: {
          startDate,
          endDate,
          selectedProducts,
          selectedRetailers,
        },
        auth: { cubeAccessToken },
      } = getState();
      const dateRange: [string, string] = [startDate, endDate];

      if (
        startDate &&
        endDate &&
        selectedProducts.length &&
        selectedRetailers.length
      ) {
        const clientVariants = await getProducts(
          cubeAccessToken,
          regionCode,
          dateRange,
          selectedProducts.filter(Boolean).map((product) => product.name),
          selectedRetailers.filter(Boolean).map((retailer) => retailer.name)
        );
        dispatch(setChart(clientVariants));
      }
    } catch (error) {
      dispatch(handleRequestError(error, 'getChartRecords'));
    }

    dispatch(setChartLoading(false));
  };

export default getChartRecords;
