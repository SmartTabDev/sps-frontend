// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: '/login',
};

export const PATH_DASHBOARD = {
  root: '/dashboard',
  productMonitor: {
    root: '/product-monitor',
  },
  offlineAvailability: {
    root: '/offline-availability',
  },
  priceAnalysis: {
    root: '/price-analysis',
    rspIndex: '/price-analysis/rsp-index',
    pricePerformance: '/price-analysis/price-performance',
    alerts: '/price-analysis/alerts',
  },
  digitalShelf: {
    root: '/digital-shelf',
    productAvailability: '/digital-shelf/product-availability',
    ratingAndReviews: '/digital-shelf/rating-and-reviews',
    shareOfSearch: '/digital-shelf/share-of-search',
    shareOfCategory: '/digital-shelf/share-of-category',
  },
  marketplaces: {
    root: '/marketplaces',
    allegro: '/marketplaces/allegro',
    ceneo: '/marketplaces/ceneo',
    idealo: '/marketplaces/idealo',
    shopee: '/marketplaces/shopee',
  },
  marketRadar: {
    root: '/market-radar',
  },
  contentModule: {
    root: '/content-module',
    contentCompass: '/content-module/content-compass',
  },
  productDetails: {
    root: '/product-details',
  },
  eveLevel: {
    root: '/eye-level',
  },
};
