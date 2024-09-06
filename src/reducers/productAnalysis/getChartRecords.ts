import { AppThunk } from 'types/AppThunk';
import {
  getSPSVariants,
  getPriceDrilldown,
  getPriceDrilldownRange,
} from 'api/SPS/product';
import { PriceAnalysisTimeframe } from 'pages/SPS/ProductAnalysis/types';
import { configApi } from 'api';
import getCubeName from 'utils/getCubeName';
import { setChart, setRRP, setChartLoading, setOffers } from './actions';
import handleRequestError from '../auth/handleRequestError';
import getPriceDrilldownOffers from './getPriceDrilldownOffers';
import buildFinalSeries from './buildFinalSeries';

const Variants = getCubeName('Variants');

const getChartRecords =
  (
    configId: number | undefined,
    regionCode: string | undefined,
    timeframe: PriceAnalysisTimeframe,
    productId: string | undefined,
  ): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setChartLoading(true));
      const { cubeAccessToken, configAccessToken } = getState().auth;

      if (timeframe && productId) {
        const clientVariants = await getSPSVariants(
          cubeAccessToken,
          regionCode,
          timeframe,
          productId
        );

        const priceDrilldownOffers = await getPriceDrilldown(
          cubeAccessToken,
          regionCode,
          productId
        );

        const priceDrilldownOffersRange = await getPriceDrilldownRange(
          cubeAccessToken,
          regionCode,
          productId
        );

        const offers = getPriceDrilldownOffers(
          priceDrilldownOffers,
          priceDrilldownOffersRange
        );

        const variants = clientVariants.rawData();
        let rrp;

        if (variants.length > 0 && variants[0][`${Variants}.productid`]) {
          const res = await configApi({
            method: 'get',
            url: `/sps/config/${configId}/products/product/${
              variants[0][`${Variants}.productid`]
            }`,
            headers: {
              accesstoken: configAccessToken,
            },
          });
          rrp = res.data.recommendedPrice;
        }

        const chartData = buildFinalSeries(clientVariants, rrp);

        dispatch(setOffers(offers));
        dispatch(setRRP(rrp));
        dispatch(setChart(chartData));
      }
    } catch (error) {
      dispatch(handleRequestError(error, 'getChartRecords'));
    }

    dispatch(setChartLoading(false));
  };

export default getChartRecords;
