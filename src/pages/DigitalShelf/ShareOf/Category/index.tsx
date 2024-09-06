import React, { useContext, useEffect, useState } from 'react';
import FullSizeModal from 'components/FullSizeModal/FullSizeModal';
import Page from 'components/Page/Page';
import { FullWidthLinearLoader } from 'components/LinearLoader';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getCategoryShare } from 'reducers/categoryShare/actions';
import { ConfigContext } from 'contexts/ConfigContext';
import { Stack, styled } from '@mui/system';
import SearchFilter from 'components/SearchFilter/SearchFilter';
import { useSearch } from 'hooks/useSearch';
import { ActionHeader } from 'components/Page/Header';
import { includeLowerCase } from 'utils/includeLowerCase';
import { Container } from '@mui/material';
import CategoryShareDetails from '../CategoryDetails';
import Table, { TableWrapper } from '../components/Table/index';
import TotalCategoryShare from './components/TotalCategoryShare';
import { Cell } from './types';
import { buildTable } from '../utils/buildTable';
import { getMatchedProducts } from '../utils/getMatchedProducts';
import filterCellProducts from '../utils/filterCellProducts';

const SyledContainer = styled(Container)`
  position: relative;
  height: calc(100vh - 153px);
  display: flex;
  flex-direction: column;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryShare: React.FC = () => {
  const dispatch = useDispatch();
  const { regionCode } = useContext(ConfigContext);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [table, setTable] = useState<Cell[][]>([[]]);

  const {
    categoryShareDetails: details,
    categoryShareLoading,
    selectedCategoryId: categoryId,
    selectedRetailerId: retailerId,
  } = useSelector((state: RootState) => state.categoryShare);

  const {
    categoryRetailers,
    links = [],
    categoryLinksCategories: categories = [],
    searchTerms = [],
  } = useSelector((state: RootState) => state.config.kpi);

  const {
    handleSearchClear,
    handleSearchSubmit,
    handleSearchChange,
    searchFilter,
    requestSearchFilter,
    handleEmptySearchResult,
  } = useSearch();

  useEffect(() => {
    if (categoryRetailers.length > 0 && regionCode) {
      dispatch(getCategoryShare(regionCode));
    }
  }, [dispatch, regionCode, categoryRetailers, requestSearchFilter]);

  useEffect(() => {
    if (details && details.length > 0) {
      const filteredCategories = categories.filter((x) =>
        includeLowerCase(x.name, requestSearchFilter)
      );

      const result = buildTable(
        categoryRetailers,
        filteredCategories,
        details,
        searchTerms,
        'Category',
        'categoryid'
      );

      if (filteredCategories.length === 0) {
        handleEmptySearchResult();
      }

      setTable(result.table);
    }
  }, [
    details,
    categories,
    links,
    categoryRetailers,
    searchTerms,
    requestSearchFilter,
    handleEmptySearchResult,
  ]);

  const matchedProducts = filterCellProducts({
    items: getMatchedProducts(searchTerms, details),
    searchOfKey: 'categoryid',
    searchOfValue: categoryId,
    retailerId,
  });

  return (
    <Page
      title="Share of Category"
      date={moment(Date.now())}
      navMargin="0 24px"
      renderNav={() => (
        <Stack sx={{ ml: 'auto' }}>
          <SearchFilter
            onChange={handleSearchChange}
            onSubmit={handleSearchSubmit}
            onClear={handleSearchClear}
            value={searchFilter}
            isDisabled={false}
          />
        </Stack>
      )}
      NavWrapper={ActionHeader}
    >
      <SyledContainer disableGutters maxWidth={false}>
        <Stack spacing="24px" alignItems="stretch" mx="24px">
          <TotalCategoryShare />
        </Stack>
        <TableWrapper>
          {categoryShareLoading ? (
            <FullWidthLinearLoader width={250} text="Building your table" />
          ) : (
            <Table
              list={table}
              type="categories"
              handleOpenModal={() => setModalOpen(true)}
            />
          )}
        </TableWrapper>
        <FullSizeModal
          open={isModalOpen}
          onClose={() => setModalOpen(false)}
          headerProps={{
            title: '',
          }}
        >
          <CategoryShareDetails matchedProducts={matchedProducts} />
        </FullSizeModal>
      </SyledContainer>
    </Page>
  );
};

export default CategoryShare;
