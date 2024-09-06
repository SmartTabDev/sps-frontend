import { AppThunk } from 'types/AppThunk';
import { getCategoryShareDetails } from 'api/KPI/CategoryShare/getCategoryShareDetails';
import handleRequestError from '../auth/handleRequestError';
import { categoryShareSlice } from './categoryShare';

export const {
  setCategoryShareLoading,
  setCategoryShareDetails,
  setSelectedCategoryShareDetails,
} = categoryShareSlice.actions;

const setSelectedDetails =
  (details: any[]): AppThunk =>
  async (dispatch) => {
    if (details.length) {
      dispatch(
        setSelectedCategoryShareDetails({
          keywordId: details[0].keywordid,
          retailerId: details[0].retailerid,
        })
      );
    }
  };

export const getCategoryShare =
  (regionCode: string | undefined): AppThunk =>
  async (dispatch, getState) => {
    try {
      const {
        auth: { cubeAccessToken },
        config: {
          kpi: { categoryRetailers },
        },
      } = getState();
      const retailerIds = categoryRetailers.map((r) => String(r.id));

      if (retailerIds.length > 0) {
        dispatch(setCategoryShareLoading(true));
        const details = await getCategoryShareDetails(
          cubeAccessToken,
          regionCode,
          retailerIds
        );
        dispatch(setCategoryShareDetails(details));
        dispatch(setSelectedDetails(details));
      }
    } catch (error) {
      dispatch(handleRequestError(error, 'getCategoryShare'));
    } finally {
      dispatch(setCategoryShareLoading(false));
    }
  };
