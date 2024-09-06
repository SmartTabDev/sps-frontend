import { AppThunk } from 'types/AppThunk';
import { getTotalProductsPerDimension } from 'api/KPI/ProductAvailability/getTotalProductsPerDimension';
import { ChartView } from 'types/ProductAvailability';
import handleRequestError from '../auth/handleRequestError';
import { Dimension, setTotalsPer } from '.';

export const getTotalsPer = (
  regionCode: string | undefined,
  dimension: ChartView,
  cb?: (value: boolean) => void,
): AppThunk => async (dispatch, getState) => {
  try {
    if (typeof cb === 'function') cb(true);
    const {
      auth: { cubeAccessToken },
    } = getState();

    let finalDimension = '';
    switch (dimension) {
      case 'Brand':
        finalDimension = 'brandname';
        break;
      case 'Category':
        finalDimension = 'categoryname';
        break;
      default:
        finalDimension = 'retailername';
        break;
    }

    const totalsPer = await getTotalProductsPerDimension(
      cubeAccessToken,
      regionCode,
      finalDimension as Dimension,
    );
    dispatch(setTotalsPer(totalsPer));
  } catch (error) {
    dispatch(handleRequestError(error, 'getTotalsPer'));
  } finally {
    if (cb) cb(false);
  }
};

export default getTotalsPer;
