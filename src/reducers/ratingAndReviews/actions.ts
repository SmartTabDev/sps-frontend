import { getRatingsOverTime } from 'api/KPI/RatingAndReviews/getRatingsOverTime';
import { getRatingsPerRetailer } from 'api/KPI/RatingAndReviews/getRatingsPerRetailer';
import { getReviewsCount } from 'api/KPI/RatingAndReviews/getReviewsCount';
import { AppThunk } from 'types/AppThunk';
import { fetchRatingsDetails } from 'api/KPI/RatingAndReviews/fetchRatingsDetails';
import handleRequestError from '../auth/handleRequestError';
import { ratingAndReviewsSlice } from './ratingAndReviews';

export const {
  setRatingLoading,
  setRatingsOverTime,
  setRatingsPerRetailer,
  setRatingReviewsCount,
  setCurrentView,
  setInitialView,
  setRatingsDetails,
  setRatingsDetailsLoading,
} = ratingAndReviewsSlice.actions;

export const getRatingAndReviews =
  (regionCode: string | undefined): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setRatingLoading(true));
      const {
        auth: { cubeAccessToken },
      } = getState();

      if (cubeAccessToken) {
        const ratingsOverTime = await getRatingsOverTime(
          cubeAccessToken,
          regionCode
        );
        const ratingReviewsCount = await getReviewsCount(
          cubeAccessToken,
          regionCode
        );
        const ratingsPerRetailer = await getRatingsPerRetailer(
          cubeAccessToken,
          regionCode
        );

        dispatch(setRatingsOverTime(ratingsOverTime));
        dispatch(setRatingsPerRetailer(ratingsPerRetailer));
        dispatch(setRatingReviewsCount(ratingReviewsCount));
      }
    } catch (error) {
      dispatch(handleRequestError(error, 'getRatingAndReviews'));
    } finally {
      dispatch(setRatingLoading(false));
    }
  };

export const getRatingDetails =
  (
    regionCode: string | undefined,
    filter: string | undefined,
    date?: string
  ): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setRatingsDetailsLoading(true));
      const {
        auth: { cubeAccessToken },
      } = getState();
      if (cubeAccessToken) {
        const ratingDetails = await fetchRatingsDetails(
          cubeAccessToken,
          regionCode,
          filter,
          date
        );
        dispatch(setRatingsDetails(ratingDetails));
      }
    } catch (error) {
      dispatch(handleRequestError(error, 'getRatings'));
    } finally {
      dispatch(setRatingsDetailsLoading(false));
    }
  };
