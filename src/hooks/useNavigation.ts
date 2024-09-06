import {
  BarChartOutlined,
  FlagOutlined,
  QrCodeScannerOutlined,
  QueryStatsOutlined,
  SellOutlined,
  StorefrontOutlined,
  RadarOutlined,
  UnarchiveOutlined,
  HiveOutlined,
  ExploreOutlined,
} from '@mui/icons-material';
import { useMemo } from 'react';
import { Service } from 'reducers/auth/auth';
import { PATH_DASHBOARD } from 'routes/paths';
import {
  isDigitalShelfModule,
  isDigitalShelfSubmodule,
  isMarketplaceModule,
  isPriceAnalysisModule,
} from 'utils/auth';

// ----------------------------------------------------------------------

const ICONS = {
  alerts: FlagOutlined,
  dashboard: QrCodeScannerOutlined,
  digitalShelf: BarChartOutlined,
  priceAnalysis: QueryStatsOutlined,
  marketplaces: StorefrontOutlined,
  productMonitor: SellOutlined,
  marketRadar: RadarOutlined,
  offlineAvailability: UnarchiveOutlined,
  eveLevel: HiveOutlined,
  contentModule: ExploreOutlined,
};

const useNavigation = (services: Service[]) => {
  const navConfig = useMemo(
    () => [
      {
        subheader: '',
        items: [
          ...(isDigitalShelfModule(services)
            ? [
                {
                  title: 'Dashboard',
                  path: PATH_DASHBOARD.root,
                  icon: ICONS.dashboard,
                },
              ]
            : []),
          ...(services.includes('eye-level')
            ? [
                {
                  title: 'Eye Level',
                  path: PATH_DASHBOARD.eveLevel.root,
                  icon: ICONS.eveLevel,
                },
              ]
            : []),
          ...(services.includes('prm')
            ? [
                {
                  title: 'Product Monitor',
                  path: PATH_DASHBOARD.productMonitor.root,
                  icon: ICONS.productMonitor,
                },
              ]
            : []),
          ...(services.includes('market-radar')
            ? [
                {
                  title: 'Market Radar',
                  path: PATH_DASHBOARD.marketRadar.root,
                  icon: ICONS.marketRadar,
                },
              ]
            : []),
          ...(services.includes('content-module')
            ? [
                {
                  title: 'Content Compass',
                  path: PATH_DASHBOARD.contentModule.contentCompass,
                  icon: ICONS.contentModule,
                },
              ]
            : []),
          ...(services.includes('oam-stats')
            ? [
                {
                  title: 'Offline Availability',
                  path: PATH_DASHBOARD.offlineAvailability.root,
                  icon: ICONS.offlineAvailability,
                },
              ]
            : []),
          ...(isPriceAnalysisModule(services)
            ? [
                {
                  title: 'Price Analysis',
                  path: PATH_DASHBOARD.priceAnalysis.root,
                  icon: ICONS.priceAnalysis,
                  children: [
                    ...(services.includes('sps-rrp-index')
                      ? [
                          {
                            title: 'RSP Index',
                            path: PATH_DASHBOARD.priceAnalysis.rspIndex,
                          },
                        ]
                      : []),
                    ...(services.includes('sps')
                      ? [
                          {
                            title: 'Price Performance',
                            path: PATH_DASHBOARD.priceAnalysis.pricePerformance,
                          },
                        ]
                      : []),
                    ...(services.includes('sps-notifications')
                      ? [
                          {
                            title: 'Alerts',
                            path: PATH_DASHBOARD.priceAnalysis.alerts,
                          },
                        ]
                      : []),
                  ],
                },
              ]
            : []),
          ...(isMarketplaceModule(services)
            ? [
                {
                  title: 'Marketplaces',
                  path: PATH_DASHBOARD.marketplaces.root,
                  icon: ICONS.marketplaces,
                  children: [
                    ...(services.includes('allegro')
                      ? [
                          {
                            title: 'Allegro',
                            path: PATH_DASHBOARD.marketplaces.allegro,
                          },
                        ]
                      : []),
                    ...(services.includes('ceneo')
                      ? [
                          {
                            title: 'Ceneo',
                            path: PATH_DASHBOARD.marketplaces.ceneo,
                          },
                        ]
                      : []),
                    ...(services.includes('idealo')
                      ? [
                          {
                            title: 'Idealo',
                            path: PATH_DASHBOARD.marketplaces.idealo,
                          },
                        ]
                      : []),
                    ...(services.includes('shopee')
                      ? [
                          {
                            title: 'Shopee',
                            path: PATH_DASHBOARD.marketplaces.shopee,
                          },
                        ]
                      : []),
                  ],
                },
              ]
            : []),
          ...(isDigitalShelfModule(services)
            ? [
                {
                  title: 'Digital Shelf',
                  path: PATH_DASHBOARD.digitalShelf.root,
                  icon: ICONS.digitalShelf,
                  children: [
                    ...(isDigitalShelfSubmodule(services, 'kpi-av')
                      ? [
                          {
                            title: 'Product Availability',
                            path: PATH_DASHBOARD.digitalShelf
                              .productAvailability,
                          },
                        ]
                      : []),
                    ...(isDigitalShelfSubmodule(services, 'kpi-rnr')
                      ? [
                          {
                            title: 'Ratings & Reviews',
                            path: PATH_DASHBOARD.digitalShelf.ratingAndReviews,
                          },
                        ]
                      : []),
                    ...(isDigitalShelfSubmodule(services, 'kpi-sos')
                      ? [
                          {
                            title: 'Share of Search',
                            path: PATH_DASHBOARD.digitalShelf.shareOfSearch,
                          },
                        ]
                      : []),
                    ...(isDigitalShelfSubmodule(services, 'kpi-soc')
                      ? [
                          {
                            title: 'Share of Category',
                            path: PATH_DASHBOARD.digitalShelf.shareOfCategory,
                          },
                        ]
                      : []),
                  ],
                },
              ]
            : []),
        ],
      },
    ],
    [services]
  );

  return navConfig;
};

export default useNavigation;
