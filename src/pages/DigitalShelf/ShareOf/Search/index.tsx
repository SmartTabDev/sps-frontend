import React, { useContext, useEffect, useState } from 'react';
import Page from 'components/Page/Page';
import FullSizeModal from 'components/FullSizeModal/FullSizeModal';
import { FullWidthLinearLoader } from 'components/LinearLoader';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getSearchShare } from 'reducers/searchShare/customActions';
import { ConfigContext } from 'contexts/ConfigContext';
import { Stack, styled } from '@mui/system';
import SearchFilter from 'components/SearchFilter/SearchFilter';
import { useSearch } from 'hooks/useSearch';
import { ActionHeader } from 'components/Page/Header';
import { includeLowerCase } from 'utils/includeLowerCase';
import { Container } from '@mui/material';
import SearchShareDetails from '../SearchDetails';
import TotalSearchShare from './components/TotalSearchShare';
import { Cell } from './types';
import Table, { TableWrapper } from '../components/Table/index';
import { buildTable } from '../utils/buildTable';
import { getMatchedProducts } from '../utils/getMatchedProducts';

const SyledContainer = styled(Container)`
  position: relative;
  height: calc(100vh - 153px);
  display: flex;
  flex-direction: column;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const SearchShare: React.FC = () => {
  const { regionCode } = useContext(ConfigContext);
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [table, setTable] = useState<Cell[][]>([[]]);

  const {
    searchShareDetails: details,
    searchShareLoading,
    selectedKeywordId,
    selectedRetailerId,
  } = useSelector((state: RootState) => state.searchShare);

  const {
    searchRetailers,
    links = [],
    keywords = [],
    searchTerms = [],
  } = useSelector((state: RootState) => state.config.kpi);

  const { cubeAccessToken } = useSelector((state: RootState) => state.auth);

  const {
    handleSearchClear,
    handleSearchSubmit,
    handleSearchChange,
    searchFilter,
    requestSearchFilter,
    handleEmptySearchResult,
  } = useSearch();

  useEffect(() => {
    if (searchRetailers.length > 0 && cubeAccessToken && regionCode) {
      dispatch(getSearchShare(regionCode));
    }
  }, [
    dispatch,
    searchRetailers,
    cubeAccessToken,
    regionCode,
    requestSearchFilter,
  ]);

  useEffect(() => {
    if (details.length > 0) {
      const filteredKeywords = keywords.filter((x) =>
        includeLowerCase(x.name, requestSearchFilter)
      );

      const result = buildTable(
        searchRetailers,
        filteredKeywords,
        details,
        searchTerms,
        'Search term',
        'keywordid'
      );

      if (filteredKeywords.length === 0) {
        handleEmptySearchResult();
      }

      setTable(result.table);
    }
  }, [
    details,
    keywords,
    links,
    searchRetailers,
    searchTerms,
    requestSearchFilter,
    handleEmptySearchResult,
  ]);

  const matchedProducts = getMatchedProducts(searchTerms, details).filter(
    (item) =>
      item.keywordid === selectedKeywordId &&
      item.retailerid === selectedRetailerId
  );

  return (
    <Page
      title="Share of Search"
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
          <TotalSearchShare />
        </Stack>
        <TableWrapper>
          {searchShareLoading ? (
            <FullWidthLinearLoader width={250} text="Building your table" />
          ) : (
            <Table
              list={table}
              handleOpenModal={() => setModalOpen(true)}
              type="keywords"
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
          <SearchShareDetails matchedProducts={matchedProducts} />
        </FullSizeModal>
      </SyledContainer>
    </Page>
  );
};

export default SearchShare;
