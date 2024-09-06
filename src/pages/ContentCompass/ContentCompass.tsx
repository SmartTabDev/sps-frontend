import React, { useCallback, useEffect } from 'react';
import { Stack, Button, Box } from '@mui/material';
import Page from 'components/Page/Page';
import { ActionHeader } from 'components/Page/Header';
import { useHistory, useLocation } from 'react-router';
import { PATH_DASHBOARD } from 'routes/paths';
import { SlideOutWrapper } from 'components/SlideOutWrapper/SlideOutWrapper';
// import {
//   GRID_ROOT_GROUP_ID,
//   GridEventListener,
//   GridGroupNode,
//   useGridApiRef,
// } from '@mui/x-data-grid-premium';
import useExpandedFilters, { FilterActionType } from 'hooks/useExpandedFilters';
import SearchFilter from 'components/SearchFilter/SearchFilter';
import contentCompassRowsMock from 'mocks/contentCompass/dataTable';
import SlideOutLevels from './components/SlideOutLevels/SlideOutLevels';
import { ExcelDownloadButton } from './components/ExcelDownloadButton/ExcelDownloadButton';
import DataTable from './components/DataTable';
import {
  ContentCompassFilters,
  contentCompassFiltersInitialState,
} from './components/ExpandedFilters/ExpandedFilters';

interface DashboardNavigationState {
  productDetailsDate: Date;
}

const ContentCompass: React.FC = () => {
  // const location = useLocation<DashboardNavigationState>();
  // const history = useHistory<DashboardNavigationState>();
  // const productDetailsPage = PATH_DASHBOARD.productDetails.root;
  // const gridApiRef = useGridApiRef();
  //
  // const {
  //   dispatch: filterDispatch,
  //   state: filterState,
  //   requestState,
  //   handleApply,
  // } = useExpandedFilters<ContentCompassFilters>(
  //   contentCompassFiltersInitialState
  // );
  //
  // const { searchFilter: requestSearchFilter } = requestState;
  // const { searchFilter } = filterState;
  //
  // // search
  // const handleSearchChange = useCallback(
  //   (value, send = false) => {
  //     filterDispatch(
  //       {
  //         type: FilterActionType.SET,
  //         payload: {
  //           key: 'searchFilter',
  //           value,
  //         },
  //       },
  //       send
  //     );
  //   },
  //   [filterDispatch]
  // );
  //
  // const handleSearchSubmit = useCallback(() => {
  //   handleApply();
  // }, [handleApply]);
  //
  // const handleSearchClear = useCallback(() => {
  //   handleSearchChange('', true);
  // }, [handleSearchChange]);
  //
  // const toggleAllGroups = useCallback(
  //   (isExpanded: boolean) => {
  //     const groups =
  //       // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  //       gridApiRef.current.getRowNode<GridGroupNode>(
  //         GRID_ROOT_GROUP_ID
  //       )!.children;
  //
  //     groups.forEach((group) => {
  //       const groups2 =
  //         // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  //         gridApiRef.current.getRowNode<GridGroupNode>(group)!.children;
  //       gridApiRef.current.setRowChildrenExpansion(group, isExpanded);
  //       groups2.forEach((group2) => {
  //         gridApiRef.current.setRowChildrenExpansion(group2, isExpanded);
  //       });
  //     });
  //   },
  //   [gridApiRef]
  // );
  //
  // useEffect(() => {
  //   if (gridApiRef && gridApiRef.current) {
  //     gridApiRef.current.setFilterModel({
  //       items: [
  //         {
  //           field: 'product',
  //           operator: 'contains',
  //           value: requestSearchFilter,
  //         },
  //       ],
  //     });
  //   }
  //
  //   toggleAllGroups(Boolean(requestSearchFilter));
  // }, [gridApiRef, requestSearchFilter, toggleAllGroups]);
  //
  // useEffect(() => {
  //   const handleRowClick: GridEventListener<'rowClick'> = (params) => {
  //     if (params.row.id) {
  //       history.push(`${productDetailsPage}/${params.row.id}`, {
  //         productDetailsDate: new Date(2023, 3, 1, 1, 1, 1),
  //       });
  //     }
  //   };
  //
  //   return gridApiRef.current.subscribeEvent('rowClick', handleRowClick);
  // }, [gridApiRef, history, productDetailsPage]);

  return (
    <>
      <Page
        title="Content Compass"
        NavWrapper={ActionHeader}
        renderNav={() => (
          <Box flex={1} display="flex" justifyContent="end">
            {/*<Stack spacing={2} direction="row">*/}
            {/*  <SearchFilter*/}
            {/*    onChange={handleSearchChange}*/}
            {/*    onSubmit={handleSearchSubmit}*/}
            {/*    onClear={handleSearchClear}*/}
            {/*    value={searchFilter}*/}
            {/*    isDisabled={false}*/}
            {/*  />*/}
            {/*  <ExcelDownloadButton gridApiRef={gridApiRef} />*/}
            {/*</Stack>*/}
          </Box>
        )}
        scrollable
      >
        {/*<Stack spacing="24px" alignItems="stretch" mx="24px">*/}
        {/*  <SlideOutWrapper>*/}
        {/*    <DataTable*/}
        {/*      apiRef={gridApiRef}*/}
        {/*      loading={false}*/}
        {/*      rows={contentCompassRowsMock}*/}
        {/*    />*/}
        {/*    <SlideOutLevels />*/}
        {/*  </SlideOutWrapper>*/}
        {/*  /!* TODO: Remove mock button for data test if api will be ready *!/*/}
        {/*  <Button*/}
        {/*    onClick={() =>*/}
        {/*      history.push(`${productDetailsPage}/1`, {*/}
        {/*        productDetailsDate: new Date(2023, 3, 1, 1, 1, 1),*/}
        {/*      })*/}
        {/*    }*/}
        {/*  >*/}
        {/*    Redirect to 1 Apr 2023*/}
        {/*  </Button>*/}
        {/*  {location.state?.productDetailsDate.toDateString()}*/}
        {/*</Stack>*/}
      </Page>
    </>
  );
};

export default ContentCompass;
