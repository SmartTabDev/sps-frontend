import getCubeName from 'utils/getCubeName';
import { useCubeRuns } from 'hooks/useCubeRuns';
import { useContext } from 'react';
import { ConfigContext } from 'contexts/ConfigContext';
import { useRecapData } from './useRecapData';
import { OAMFilters } from '../components/ExpandedFilters/ExpandedFilters';
import { createRecaps } from './createRecaps';

const Products = getCubeName('Products', 'oam_aggregations');

export default function useOfflineAvailabilityRecap(filters: OAMFilters) {
  const { regionCode } = useContext(ConfigContext);

  const { currentRunDate, previousRunDate } = useCubeRuns(`${Products}.date`);

  const retailerRecapData = useRecapData({
    regionCode,
    granularity: 'day',
    timeDimension: currentRunDate,
    mainDimension: 'retailer',
    filters,
  });

  const prevRetailerRecapData = useRecapData({
    regionCode,
    granularity: 'day',
    timeDimension: previousRunDate,
    mainDimension: 'retailer',
    filters,
  });

  const categoryRecapData = useRecapData({
    regionCode,
    granularity: 'day',
    timeDimension: currentRunDate,
    mainDimension: 'category',
    filters,
  });

  const prevCategoryRecapData = useRecapData({
    regionCode,
    granularity: 'day',
    timeDimension: previousRunDate,
    mainDimension: 'category',
    filters,
  });

  const newRetailerRecaps = createRecaps(
    retailerRecapData.cards,
    prevRetailerRecapData.cards
  );

  const newCategoryRecaps = createRecaps(
    categoryRecapData.cards,
    prevCategoryRecapData.cards
  );

  return {
    retailerRecaps: newRetailerRecaps,
    categoryRecaps: newCategoryRecaps,
  };
}
