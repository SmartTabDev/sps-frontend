import React, { useContext } from 'react';
import * as Cube from '@cubejs-client/core';
import { Stack } from '@mui/material';
import { styled } from '@mui/system';
import ChangeOverTime from 'components/Charts/ChangeOverTime';
import FiltersDrawerPlaced from 'components/FiltersDrawer/FiltersDrawerPlaced';
import OfflineAvailabilityRecapCard from 'components/Recaps/OfflineAvailabilityRecapCard';
import Page from 'components/Page/Page';
import RecapCardList from 'components/Recaps/RecapCardList';
import RecapContainer from 'components/Recaps/RecapContainer';
import { ActionHeader } from 'components/Page/Header';
import { RecapWrapper } from 'components/Recaps/RecapWrapper';
import { ContentContainer } from 'components/FiltersDrawer/FiltersDrawer';
import { useCardWidth } from 'components/Recaps/hooks/useCardWidth';
import { ConfigContext } from 'contexts/ConfigContext';
import useExpandedFilters from 'hooks/useExpandedFilters';
import Reports from 'components/ReportPopper/Reports';
import { useFilterList } from './hooks/useFilterList';
import useOfflineAvailabilityRecap from './hooks/useOfflineAvailabilityRecap';
import { useTotalChangeOverTime } from './hooks/useTotalChangeOverTime';
import ExpandedFilters, {
  OAMFilters,
  OAMFiltersInitialState,
} from './components/ExpandedFilters/ExpandedFilters';
import ChartCard from './components/ChartCard/ChartCard';
import ChangeOverTimeByTwoDimensions from './components/ChangeOverTimeByTwoDimensions/ChangeOverTimeByTwoDimensions';
import { useReports } from './hooks/useReports';

const StyledRecapWrapper = styled(RecapWrapper)`
  width: 100%;
`;

const OfflineAvailability: React.FC = () => {
  const { regionCode } = useContext(ConfigContext);

  const {
    dispatch: filterDispatch,
    state: filterState,
    requestState,
    refreshKey,
    handleClear,
    handleApply,
  } = useExpandedFilters<OAMFilters>(OAMFiltersInitialState);

  const { selectedRetailers, selectedCategories, timeDimension } = requestState;

  const { retailers, categories } = useFilterList(regionCode);

  const granularity: Cube.TimeDimensionGranularity = 'week';

  const totalChangeOverTime = useTotalChangeOverTime(
    regionCode,
    granularity,
    timeDimension,
    selectedRetailers,
    selectedCategories
  );
  const { values, reducedValues, dates, isLoading } = totalChangeOverTime;

  const { retailerRecaps, categoryRecaps } =
    useOfflineAvailabilityRecap(requestState);

  const retailerCardCount = useCardWidth(retailers.length);
  const categoryCardCount = useCardWidth(categories.length);

  const { reports, handleReportClick } = useReports();

  return (
    <>
      <Page
        title="Offline Availability"
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
              <Reports
                list={reports}
                isLoading={false}
                handleReportClick={handleReportClick}
              />
              <FiltersDrawerPlaced title="Filters" drawerWidth={390}>
                <ContentContainer>
                  <ExpandedFilters
                    filterDispatch={filterDispatch}
                    filterState={filterState}
                    refreshKey={refreshKey}
                    handleClear={handleClear}
                    handleApply={handleApply}
                    retailers={retailers}
                    categories={categories}
                  />
                </ContentContainer>
              </FiltersDrawerPlaced>
            </Stack>
          </>
        )}
      >
        <Stack spacing="24px" alignItems="stretch" mx="24px">
          <RecapContainer
            isLoaded={!isLoading}
            Panel={StyledRecapWrapper}
            cardCount={retailerCardCount}
          >
            <RecapCardList
              cards={retailerRecaps}
              Card={OfflineAvailabilityRecapCard}
            />
          </RecapContainer>
          <ChartCard
            title="Total Change over time"
            chart={
              <ChangeOverTime
                XAxisData={dates}
                data={reducedValues}
                isLoading={isLoading}
                minHeight="250px"
              />
            }
          />
          <ChartCard
            title="Channel Change over time"
            chart={
              <ChangeOverTime
                XAxisData={dates}
                data={values}
                legendData={values.map((v) => v.name)}
                isLoading={isLoading}
                minHeight="250px"
              />
            }
          />
          <RecapContainer
            isLoaded={!isLoading}
            Panel={StyledRecapWrapper}
            cardCount={categoryCardCount}
          >
            <RecapCardList
              cards={categoryRecaps}
              Card={OfflineAvailabilityRecapCard}
            />
          </RecapContainer>
          {/* <ChartCard
            title="Change over time of SKU count per retailer"
            chart={<></>}
          /> */}
          <ChartCard
            title="Change over time by category and retailer"
            chart={
              <ChangeOverTimeByTwoDimensions
                nameDimension="category"
                groupDimension="retailer"
                filters={requestState}
              />
            }
          />
          <ChartCard
            title="Change over time by shop class and retailer"
            chart={
              <ChangeOverTimeByTwoDimensions
                nameDimension="shop_class"
                groupDimension="retailer"
                filters={requestState}
              />
            }
          />
          <ChartCard
            title="Mag drilldown"
            chart={
              <ChangeOverTimeByTwoDimensions
                nameDimension="subcategory"
                groupDimension="retailer"
                filters={requestState}
              />
            }
          />
        </Stack>
      </Page>
    </>
  );
};

export default OfflineAvailability;
