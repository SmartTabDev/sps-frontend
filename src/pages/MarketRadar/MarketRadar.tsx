import React, { useContext } from 'react';
import Page from 'components/Page/Page';
import { ActionHeader } from 'components/Page/Header';
import { Stack } from '@mui/system';
import { useBrands } from 'pages/MarketRadar/hooks/useBrands';
import { ConfigContext } from 'contexts/ConfigContext';
import FiltersDrawerPlaced from 'components/FiltersDrawer/FiltersDrawerPlaced';
import { ContentContainer } from 'components/FiltersDrawer/FiltersDrawer';
import useExpandedFilters from 'hooks/useExpandedFilters';
import { getTimeDimensionGranularity } from 'utils/cube/getTimeDimensionGranularity';
import ShareOfShelf from './components/ShareOfShelf/ShareOfShelf';
import OfferPriceDevelopment from './components/OfferPriceDevelopment/OfferPriceDevelopment';
import DistributionGraph from './components/DistributionGraph/DistributionGraph';
import BrandsAndShelfShare from './components/BrandsAndShelfShare/BrandsAndShelfShare';
import ExpandedFilters, {
  MarketRadarFilters,
  marketRadarFiltersInitialState,
} from './components/ExpandedFilters/ExpandedFilters';
import { useFilterList } from './hooks/useFilterList';
import { useFilteredAndUniqueCategories } from './hooks/useFilteredAndUniqueCategories';

const MarketRadar: React.FC = () => {
  const { regionCode } = useContext(ConfigContext);

  const {
    dispatch: filterDispatch,
    state: filterState,
    requestState,
    refreshKey,
    handleClear,
    handleApply,
  } = useExpandedFilters<MarketRadarFilters>(marketRadarFiltersInitialState);

  const { selectedRetailers, selectedCategories, timeDimension } = requestState;

  const { retailers, categories } = useFilterList(regionCode);
  const { selectedRetailers: selectedRetailersState } = filterState;

  const filteredCategories = useFilteredAndUniqueCategories(
    categories,
    selectedRetailersState
  );

  const granularity = getTimeDimensionGranularity(timeDimension.name);

  const { brands } = useBrands(
    regionCode,
    granularity,
    selectedRetailers,
    selectedCategories
  );

  return (
    <Page
      title="Market Radar"
      navMargin="0 20px"
      NavWrapper={ActionHeader}
      scrollable
      renderNav={() => (
        <>
          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            sx={{ ml: 'auto' }}
          >
            <FiltersDrawerPlaced title="Filters" drawerWidth={390}>
              <ContentContainer>
                <ExpandedFilters
                  filterDispatch={filterDispatch}
                  filterState={filterState}
                  refreshKey={refreshKey}
                  handleClear={handleClear}
                  handleApply={handleApply}
                  retailers={retailers}
                  categories={filteredCategories}
                />
              </ContentContainer>
            </FiltersDrawerPlaced>
          </Stack>
        </>
      )}
    >
      <Stack spacing="24px" alignItems="stretch" mx="24px">
        <ShareOfShelf
          brands={brands}
          retailers={selectedRetailers}
          categories={selectedCategories}
          granularity={granularity}
          timeDimension={timeDimension}
        />
        <BrandsAndShelfShare
          retailers={selectedRetailers}
          categories={selectedCategories}
          granularity={granularity}
          timeDimension={timeDimension}
        />
        <OfferPriceDevelopment
          brands={brands}
          retailers={selectedRetailers}
          categories={selectedCategories}
          granularity={granularity}
          calc="weightedAvg"
          timeDimension={timeDimension}
        />
        <DistributionGraph
          brands={brands}
          allRetailers={retailers}
          retailers={selectedRetailers}
          categories={selectedCategories}
          granularity={granularity}
          timeDimension={timeDimension}
        />
      </Stack>
    </Page>
  );
};

export default MarketRadar;
