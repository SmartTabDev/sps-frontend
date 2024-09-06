import React, { useContext } from 'react';
import { Stack, Box, Grid } from '@mui/material';
import Page from 'components/Page/Page';
import { ActionHeader } from 'components/Page/Header';
import { ConfigContext } from 'contexts/ConfigContext';
import useExpandedFilters from 'hooks/useExpandedFilters';
import { getTimeDimensionGranularity } from 'utils/cube/getTimeDimensionGranularity';
import FiltersDrawerPlaced from 'components/FiltersDrawer/FiltersDrawerPlaced';
import { ContentContainer } from 'components/FiltersDrawer/FiltersDrawer';
// import { UnifyCard, UnifyCardTitle } from 'components/UnifyCard/UnifyCard';
import NoData from 'components/NoData';
import { useRSPIndexPerStore } from './hooks/useRSPIndexPerStore';
import ExpandedFilters, {
  RSPIndexFilters,
  rspIndexFiltersInitialState,
} from './components/ExpandedFilters/ExpandedFilters';
import { useFilterList } from './hooks/useFilterList';
import { useFilteredAndUniqueCategories } from './hooks/useFilteredAndUniqueCategories';
import { RRPPerStoreInTimeCard } from './components/RRPPerStoreInTimeCard/RRPPerStoreInTimeCard';
import { RRPPerStoreCard } from './components/RRPPerStoreCard/RRPPerStoreCard';

const RSPIndex: React.FC = () => {
  const { regionCode } = useContext(ConfigContext);

  const {
    dispatch: filterDispatch,
    state: filterState,
    requestState,
    refreshKey,
    handleClear,
    handleApply,
  } = useExpandedFilters<RSPIndexFilters>(rspIndexFiltersInitialState);

  const { selectedRetailers, selectedCategories, timeDimension } = requestState;

  const { retailers, categories } = useFilterList(regionCode);
  const { selectedRetailers: selectedRetailersState } = filterState;

  const filteredCategories = useFilteredAndUniqueCategories(
    categories,
    selectedRetailersState
  );

  const granularity = getTimeDimensionGranularity(timeDimension.name);

  const { values, dates, reducedValues, isLoading } = useRSPIndexPerStore(
    regionCode,
    granularity,
    timeDimension,
    selectedRetailers,
    selectedCategories
  );

  return (
    <>
      <Page
        title="RSP Index"
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
        NavWrapper={ActionHeader}
        scrollable
      >
        <Stack spacing="24px" alignItems="stretch" mx="24px">
          {dates.length === 0 && isLoading === false ? (
            <NoData show />
          ) : (
            <>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing="24px">
                  <Grid xs={6} item>
                    <RRPPerStoreCard data={reducedValues} />
                  </Grid>
                  <Grid xs={6} item>
                    <RRPPerStoreInTimeCard data={values} xAxisData={dates} />
                  </Grid>
                </Grid>
              </Box>
              {/* <UnifyCard>
                <UnifyCardTitle>Product pricing vs RRP</UnifyCardTitle>
              </UnifyCard> */}
            </>
          )}
        </Stack>
      </Page>
    </>
  );
};

export default RSPIndex;
