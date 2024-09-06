import React, { useContext, useEffect } from 'react';
import Page from 'components/Page/Page';
import TotalProducts from 'pages/DigitalShelf/ProductAvailability/components/TotalProducts';
import { TotalRatings } from 'pages/DigitalShelf/RatingAndReviews/components/TotalRatings/TotalRatings';
import TotalSearchShare from 'pages/DigitalShelf/ShareOf/Search/components/TotalSearchShare';
import TotalCategoryShare from 'pages/DigitalShelf/ShareOf/Category/components/TotalCategoryShare';
import getAvailability from 'reducers/productAvailability/getAvailability';
import { getCategoryShare } from 'reducers/categoryShare/actions';
import { getRatingAndReviews } from 'reducers/ratingAndReviews/actions';
import { getSearchShare } from 'reducers/searchShare/customActions';
import { useDispatch, useSelector } from 'react-redux';
import { ConfigContext } from 'contexts/ConfigContext';
import { isDigitalShelfSubmodule } from 'utils/auth';
import { ActionHeader } from 'components/Page/Header';
import { Stack } from '@mui/system';

const KPI: React.FC = () => {
  const dispatch = useDispatch();
  const { regionCode } = useContext(ConfigContext);
  const { cubeAccessToken } = useSelector((state: RootState) => state.auth);
  const { retailers } = useSelector((state: RootState) => state.config.kpi);
  const services = useSelector((state: RootState) => state.auth.services);

  useEffect(() => {
    if (cubeAccessToken && regionCode) {
      dispatch(getAvailability(regionCode));
      dispatch(getRatingAndReviews(regionCode));
    }
  }, [dispatch, cubeAccessToken, regionCode]);

  useEffect(() => {
    if (retailers.length > 0 && cubeAccessToken && regionCode) {
      dispatch(getSearchShare(regionCode));
      dispatch(getCategoryShare(regionCode));
    }
  }, [dispatch, retailers, cubeAccessToken, regionCode]);

  return (
    <Page
      title="Dashboard"
      navMargin="0 24px"
      NavWrapper={ActionHeader}
      scrollable
    >
      <Stack spacing="24px" alignItems="stretch" mx="24px">
        {isDigitalShelfSubmodule(services, 'kpi-av') ? (
          <TotalProducts url="/digital-shelf/product-availability" />
        ) : null}
        {isDigitalShelfSubmodule(services, 'kpi-rnr') ? (
          <TotalRatings url="/digital-shelf/rating-and-reviews" />
        ) : null}
        {isDigitalShelfSubmodule(services, 'kpi-sos') ? (
          <TotalSearchShare url="/digital-shelf/share-of-search" />
        ) : null}
        {isDigitalShelfSubmodule(services, 'kpi-soc') ? (
          <TotalCategoryShare url="/digital-shelf/share-of-category" />
        ) : null}
      </Stack>
    </Page>
  );
};

export default KPI;
