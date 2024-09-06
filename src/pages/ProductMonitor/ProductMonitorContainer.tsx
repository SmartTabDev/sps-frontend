import React, { useEffect, useMemo, useState } from 'react';
import { Box, Stack, styled } from '@mui/system';
import Page from 'components/Page/Page';
import moment from 'moment';
import Select from 'components/Select';
import SearchField from 'components/SearchField';
import Skeleton from '@mui/material/Skeleton';
import uniqBy from 'lodash/uniqBy';
import BottomBar from 'components/BottomBar/BottomBar';
import { Pagination, Typography, Container } from '@mui/material';
import { ActionHeader } from 'components/Page/Header';
import Filters from './components/Filters/Filters';
import { ProductMonitorTable } from './components/Table/ProductMonitorTable';
import { useProductMonitorList } from './hooks/useProductMonitorList';
import { useProductMonitorConfigData } from './hooks/useProductMonitorConfigData';
import {
  ProductMonitorCategory,
  ProductMonitorRetailer,
  ProductMonitorRun,
} from './types';
import { ProductMonitorChartContainer } from './ProductMonitorChartContainer';
import { useProductMonitorFilters } from './hooks/useProductMonitorFilters';
import { useProductMonitorFeatures } from './hooks/useProductMonitorFeatures';
import { useProductMonitorPagination } from './hooks/useProductMonitorPagination';
import { useProductMonitorProducts } from './hooks/useProductMonitorProducts';
import { useProductMonitorAllProducts } from './hooks/useProductMonitorAllProducts ';

const TableWrapper = styled('div')`
  flex: 1;
  margin: 0 24px 24px 24px;
  box-shadow: 0px -2px 0px rgba(0, 0, 0, 0.02), 0px 4px 16px rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  overflow: hidden;
  position: relative;

  &::-webkit-scrollbar {
    display: none;
  }
`;

interface NavigationProps {
  category?: ProductMonitorCategory;
  mainCategory?: ProductMonitorCategory;
  categories?: ProductMonitorCategory[];
  mainCategories?: ProductMonitorCategory[];
  onChangeCategory: (category: ProductMonitorCategory) => void;
  onChangeMainCategory: (category: ProductMonitorCategory) => void;
  handleSearchChange: (value: string) => void;
  searchValue: string;
}

const NavigationWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;

  @media (max-width: 1430px) {
    margin-top: 10px;
    width: 100%;
  }
`;

const LeftSideWrapper = styled('div')`
  display: flex;
`;

const Navigation: React.FC<NavigationProps> = ({
  mainCategories,
  categories,
  category,
  mainCategory,
  onChangeCategory,
  onChangeMainCategory,
  handleSearchChange,
  searchValue,
}) => {
  const availableCategoryOptions = useMemo(() => {
    if (categories && categories.length && mainCategory) {
      return categories.filter((o) => o.parent.name === mainCategory.name);
    }

    return categories;
  }, [mainCategory, categories]);

  return (
    <NavigationWrapper>
      <LeftSideWrapper>
        {mainCategory ? (
          <Select
            options={mainCategories || []}
            getOptionLabel={(option) =>
              typeof option !== 'string' ? option.name : option
            }
            sx={{ width: 275, marginRight: '18px' }}
            label="Main category"
            value={mainCategory}
            blurOnSelect
            disableClearable
            variant="outlined"
            onChange={(_, val) =>
              onChangeMainCategory(val as ProductMonitorCategory)
            }
          />
        ) : (
          <Skeleton width={275} height={45} sx={{ mr: '18px' }} />
        )}
        {category ? (
          <Select
            options={availableCategoryOptions || []}
            getOptionLabel={(option) =>
              typeof option !== 'string' ? option.name : option
            }
            sx={{ width: 275, mr: '18px' }}
            label="Category"
            value={category}
            blurOnSelect
            disableClearable
            variant="outlined"
            onChange={(_, val) =>
              onChangeCategory(val as ProductMonitorCategory)
            }
          />
        ) : (
          <Skeleton width={275} height={45} sx={{ mr: '18px' }} />
        )}
      </LeftSideWrapper>
      <SearchField
        value={searchValue}
        onChange={handleSearchChange}
        label="Search"
        id="prm-search"
      />
    </NavigationWrapper>
  );
};

const SyledContainer = styled(Container)`
  position: relative;
  height: calc(100vh - 184px);
  display: flex;
  flex-direction: column;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const ProductMonitorContainer: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');

  const [selectedProductName, setSelectedProductName] = useState<string>();
  const [run, setRun] = useState<ProductMonitorRun>();
  const [prevRun, setPrevRun] = useState<ProductMonitorRun>();
  const [category, setCategory] = useState<ProductMonitorCategory>();
  const [mainCategory, setMainCategory] = useState<ProductMonitorCategory>();

  const { data: categories } =
    useProductMonitorConfigData<ProductMonitorCategory>('categories');
  const { data: runs } = useProductMonitorConfigData<ProductMonitorRun>('runs');
  const { data: retailers } =
    useProductMonitorConfigData<ProductMonitorRetailer>('retailers');

  const { filters, handleChange, resetFilter } = useProductMonitorFilters(
    category,
    retailers
  );

  const {
    limit,
    offset,
    total,
    handlePageChange,
    page,
    pageCount,
    isLoading: isPaginationLoading,
  } = useProductMonitorPagination(run, filters);

  const { productIds, productsStructure } = useProductMonitorProducts(
    limit,
    offset,
    run,
    filters
  );

  const { allProductIds } = useProductMonitorAllProducts(run, filters);

  const { list, isLoading: isProductMonitorListLoading } =
    useProductMonitorList(productIds, run, prevRun, filters);

  const features = useProductMonitorFeatures(allProductIds);

  const mainCategories = useMemo(
    () =>
      uniqBy(
        categories?.map((c) => c.parent),
        'id'
      ),
    [categories]
  );

  // reset search values
  useEffect(() => {
    setSearchValue('');
  }, []);

  useEffect(() => {
    handlePageChange(undefined, 1);
  }, [filters, handlePageChange]);

  // set initial category - when loaded
  useEffect(() => {
    if (categories && mainCategory) {
      setCategory(
        categories.filter((c) => c.parent.name === mainCategory.name)[0]
      );
    }
  }, [categories, mainCategory]);

  useEffect(() => {
    if (mainCategories) {
      setMainCategory(mainCategories[0]);
    }
  }, [mainCategories]);

  // reset search value after change category
  useEffect(() => {
    if (category) {
      setSearchValue('');
      handlePageChange(undefined, 1);
    }
  }, [category, handlePageChange]);

  // set initial runs - when loaded
  useEffect(() => {
    if (runs) {
      setRun(runs[runs.length - 1]);
      setPrevRun(runs[runs.length - 2]);
    }
  }, [runs]);

  return (
    <Page
      title="Product Monitor"
      date={moment(run?.createdAt)}
      renderNav={() => (
        <>
          <Navigation
            mainCategory={mainCategory}
            category={category}
            categories={categories}
            mainCategories={mainCategories}
            onChangeCategory={setCategory}
            onChangeMainCategory={setMainCategory}
            handleSearchChange={setSearchValue}
            searchValue={searchValue}
          />
          <Box sx={{ ml: '12px' }}>
            <Filters
              category={category}
              handleChange={handleChange}
              resetFilter={resetFilter}
              retailers={retailers}
              features={features}
              run={run}
              searchValue={searchValue}
            />
          </Box>
        </>
      )}
      NavWrapper={ActionHeader}
    >
      <SyledContainer disableGutters maxWidth={false}>
        <TableWrapper>
          <ProductMonitorTable
            list={list}
            handleOpenModal={setSelectedProductName}
            key={String(isProductMonitorListLoading)}
          />
        </TableWrapper>
        <BottomBar>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ width: '100%' }}
          >
            <Stack direction="row" spacing={8} />

            <Stack direction="row" spacing={1} alignItems="center">
              {isPaginationLoading ? (
                <Skeleton sx={{ width: '100px' }} />
              ) : (
                <Typography sx={{ color: '#3B455E', fontSize: '14px' }}>
                  Total products:{' '}
                  <Typography
                    sx={{
                      color: 'primary.main',
                      fontSize: '14px',
                    }}
                    component="span"
                  >
                    {total}
                  </Typography>
                </Typography>
              )}
              {isPaginationLoading ? (
                <Skeleton sx={{ width: '300px' }} />
              ) : (
                <Pagination
                  count={pageCount}
                  color="primary"
                  showFirstButton
                  showLastButton
                  page={page}
                  onChange={handlePageChange}
                />
              )}
            </Stack>
          </Stack>
        </BottomBar>
      </SyledContainer>
      <ProductMonitorChartContainer
        key={selectedProductName}
        selectedProductName={selectedProductName}
        selectedProductId={
          selectedProductName
            ? productsStructure[
                selectedProductName
                  .toUpperCase()
                  .replace(/ /g, '')
                  .replace('-', '')
              ]
            : undefined
        }
        retailers={retailers}
        runs={runs}
        handleClose={() => setSelectedProductName(undefined)}
      />
    </Page>
  );
};
