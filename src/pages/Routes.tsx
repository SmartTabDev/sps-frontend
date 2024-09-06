import React, { useContext, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSPSServiceConfig,
  getKPIServiceConfig,
} from 'reducers/config/actions';
import usePageTracking from 'hooks/usePageTracking';
import { ConfigContext } from 'contexts/ConfigContext';
import { isDigitalShelfModule, isDigitalShelfSubmodule } from 'utils/auth';
import ProductAnalysis from './SPS/ProductAnalysis/ProductAnalysisPage';
import SearchShare from './DigitalShelf/ShareOf/Search';
import RatingAndReviews from './DigitalShelf/RatingAndReviews/RatingAndReviews';
import ProductAvailability from './DigitalShelf/ProductAvailability';
import KPI from './DigitalShelf';
import CategoryShare from './DigitalShelf/ShareOf/Category';
import { IdealoMarketplace } from './Marketplaces/idealo/IdealoMarketplace';
import { CeneoMarketplace } from './Marketplaces/ceneo/CeneoMarketplace';
import { ProductMonitorContainer } from './ProductMonitor/ProductMonitorContainer';
import NotificationsPage from './Notifications/pages/NotificationsList/NotificationsList';
import Notification from './Notifications/pages/Notification/Notification';
import Allegro from './Allegro/Allegro';
import MarketRadar from './MarketRadar/MarketRadar';
import Shopee from './Shopee/Shopee';
import RSPIndex from './RSPIndex/RSPIndex';
import OfflineAvailability from './OfflineAvailability/OfflineAvailability';
import ProductDetails from './ProductDetails/ProductDetails';
import ContentCompass from './ContentCompass/ContentCompass';
import EyeLevel from './EyeLevel/EyeLevel';

const replaceRoutes = (path: string, to: string) => {
  return [
    <Route path={path} exact key={`${path}${to}`}>
      <Redirect to={`${path}${to}`} />
    </Route>,
    <Route path="/" exact key="/">
      <Redirect to={`${path}`} />
    </Route>,
  ];
};

const Routes: React.FC = () => {
  const { configId } = useContext(ConfigContext);

  usePageTracking();

  const dispatch = useDispatch();

  const configAccessToken = useSelector(
    (state: RootState) => state.auth.configAccessToken
  );
  const services = useSelector((state: RootState) => state.auth.services);

  useEffect(() => {
    if (configAccessToken) {
      if (isDigitalShelfModule(services)) {
        dispatch(getKPIServiceConfig(configId));
      }

      if (services.includes('sps') || services.includes('sps-notifications')) {
        dispatch(getSPSServiceConfig(configId));
      }
    }
  }, [services, dispatch, configAccessToken, configId]);

  return (
    <Switch>
      {/* Dashboard */}
      {isDigitalShelfModule(services) && [
        <Route path="/dashboard" key="dashboard" exact>
          <KPI />
        </Route>,
        <Route path="/" exact key="/">
          <Redirect to="/dashboard" />
        </Route>,
      ]}
      {/* Eye Level */}
      {services.includes('eye-level') && [
        <Route path="/eye-level" exact key="/eye-level">
          <EyeLevel />
        </Route>,
        <Route path="/" exact key="/">
          <Redirect to="/eye-level" />
        </Route>,
      ]}
      {/* PRM */}
      {services.includes('prm') && [
        <Route path="/product-monitor" exact key="product-monitor">
          <ProductMonitorContainer />
        </Route>,
        <Route path="/" exact key="/">
          <Redirect to="/product-monitor" />
        </Route>,
      ]}
      {/* Market Radar */}
      {services.includes('market-radar') && [
        <Route path="/market-radar" exact key="market-radar">
          <MarketRadar />
        </Route>,
        <Route path="/" exact key="/">
          <Redirect to="/market-radar" />
        </Route>,
      ]}
      {/* Content Compass */}
      {services.includes('content-module') && [
        <Route
          path="/content-module/content-compass"
          key="/content-module/content-compass"
          exact
        >
          <ContentCompass />
        </Route>,

        ...replaceRoutes('/content-module', '/content-compass'),
      ]}
      {/* Product Details (all-modules) */}
      <Route path="/product-details/:id" key="/product-details" exact>
        <ProductDetails />
      </Route>
      ,{/* OAM */}
      {services.includes('oam-stats') && [
        <Route path="/offline-availability" exact key="offline-availability">
          <OfflineAvailability />
        </Route>,
        <Route path="/" exact key="/">
          <Redirect to="/offline-availability" />
        </Route>,
      ]}
      {/* RSP Index */}
      {services.includes('sps-rrp-index') && [
        <Route path="/price-analysis/rsp-index" exact key="/rsp-index">
          <RSPIndex />
        </Route>,
        ...replaceRoutes('/price-analysis', '/rsp-index'),
      ]}
      {/* SPS */}
      {services.includes('sps') && [
        <Route
          path="/price-analysis/price-performance"
          key="/price-analysis/price-performance"
        >
          <ProductAnalysis />
        </Route>,
        ...replaceRoutes('/price-analysis', '/price-performance'),
      ]}
      {services.includes('sps-notifications') && [
        <Route
          path="/price-analysis/alerts/edit/:id"
          key="/price-analysis/alerts/edit"
          render={(props) => <Notification {...props} edit />}
        />,
        <Route
          path="/price-analysis/alerts/create"
          key="/price-analysis/alerts/create"
          render={(props) => <Notification {...props} />}
        />,
        <Route path="/price-analysis/alerts" key="/price-analysis/alerts">
          <NotificationsPage />
        </Route>,
        ...replaceRoutes('/price-analysis', '/alerts'),
      ]}
      {/* MARKETPLACES */}
      {services.includes('ceneo') && [
        <Route path="/marketplaces/ceneo" key="/marketplaces/ceneo">
          <CeneoMarketplace />
        </Route>,
        ...replaceRoutes('/marketplaces', '/ceneo'),
      ]}
      {services.includes('idealo') && [
        <Route path="/marketplaces/idealo" key="/marketplaces/idealo">
          <IdealoMarketplace />
        </Route>,
        ...replaceRoutes('/marketplaces', '/idealo'),
      ]}
      {services.includes('allegro') && [
        <Route path="/marketplaces/allegro" key="/marketplaces/allegro">
          <Allegro />
        </Route>,
        ...replaceRoutes('/marketplaces', '/allegro'),
      ]}
      {services.includes('shopee') && [
        <Route path="/marketplaces/shopee" key="/marketplaces/shopee">
          <Shopee />
        </Route>,
        ...replaceRoutes('/marketplaces', '/shopee'),
      ]}
      {/* KPI */}
      {isDigitalShelfSubmodule(services, 'kpi-av')
        ? [
            <Route
              path="/digital-shelf/product-availability"
              key="/digital-shelf/product-availability"
              exact
            >
              <ProductAvailability />
            </Route>,
            ...replaceRoutes('/digital-shelf', '/product-availability'),
          ]
        : []}
      ,
      {isDigitalShelfSubmodule(services, 'kpi-rnr')
        ? [
            <Route
              path="/digital-shelf/rating-and-reviews"
              key="/digital-shelf/rating-and-reviews"
            >
              <RatingAndReviews />
            </Route>,
            ...replaceRoutes('/digital-shelf', '/rating-and-reviews'),
          ]
        : []}
      ,
      {isDigitalShelfSubmodule(services, 'kpi-soc')
        ? [
            <Route
              path="/digital-shelf/share-of-search"
              key="/digital-shelf/share-of-search"
            >
              <SearchShare />
            </Route>,
            ...replaceRoutes('/digital-shelf', '/share-of-search'),
          ]
        : []}
      ,
      {isDigitalShelfSubmodule(services, 'kpi-sos')
        ? [
            <Route
              path="/digital-shelf/share-of-category"
              key="/digital-shelf/share-of-category"
            >
              <CategoryShare />
            </Route>,
            ...replaceRoutes('/digital-shelf', '/share-of-category'),
          ]
        : []}
      <Redirect to="/" key="" />,
    </Switch>
  );
};

export default Routes;
