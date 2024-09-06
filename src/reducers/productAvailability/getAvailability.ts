import { AppThunk } from 'types/AppThunk';
import { getCountPerDimension } from 'api/KPI/ProductAvailability/getCountPerDimension';
import { getTotalUnavailable } from 'api/KPI/ProductAvailability/getTotalUnavailable';
import { getTotalProductsOverTime } from 'api/KPI/ProductAvailability/getTotalProductsOverTime';
import { getTotalProducts } from 'api/KPI/ProductAvailability/getTotalProducts';
import { getTotalProductsPerDimension } from 'api/KPI/ProductAvailability/getTotalProductsPerDimension';
import {
  setAvailabilityLoading,
  setBrands,
  setCategories,
  setStores,
  setTotals,
  setTotalsOverTime,
  setTotalsPer,
  setTotalsUnavailable,
} from '.';
import handleRequestError from '../auth/handleRequestError';

// eslint-disable-next-line max-len
const getAvailability =
  (regionCode: string | undefined): AppThunk =>
  async (dispatch, getState) => {
    try {
      const {
        auth: { cubeAccessToken },
      } = getState();

      if (cubeAccessToken) {
        dispatch(setAvailabilityLoading(true));
        const stores = await getCountPerDimension(
          cubeAccessToken,
          regionCode,
          'retailername',
          true
        );
        dispatch(setStores(stores));

        const categories = await getCountPerDimension(
          cubeAccessToken,
          regionCode,
          'categoryname',
          true
        );
        dispatch(setCategories(categories));

        const brands = await getCountPerDimension(
          cubeAccessToken,
          regionCode,
          'brandname',
          true
        );
        dispatch(setBrands(brands));

        const total = await getTotalProducts(cubeAccessToken, regionCode);
        const { inStock, outOfStock } = total;
        total.void = 100 - (inStock + outOfStock);
        dispatch(setTotals(total));

        const totalOverTime = await getTotalProductsOverTime(
          cubeAccessToken,
          regionCode
        );
        dispatch(setTotalsOverTime(totalOverTime));

        const totalsPer = await getTotalProductsPerDimension(
          cubeAccessToken,
          regionCode,
          'retailername'
        );
        dispatch(setTotalsPer(totalsPer));

        const totalUnavailable = await getTotalUnavailable(
          cubeAccessToken,
          regionCode
        );
        dispatch(setTotalsUnavailable(totalUnavailable));
      }
    } catch (error) {
      dispatch(handleRequestError(error, 'getAvailability'));
    } finally {
      dispatch(setAvailabilityLoading(false));
    }
  };

export default getAvailability;
