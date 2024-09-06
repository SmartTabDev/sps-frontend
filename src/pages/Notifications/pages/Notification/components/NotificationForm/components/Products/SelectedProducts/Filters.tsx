import React, { useCallback } from 'react';
import { ConfigBrand, ConfigCategory, ConfigRetailer } from 'types/AppConfig';
import SelectAllStateless from 'components/SelectAll/SelectAllStateless';
import toLower from 'lodash/toLower';
import upperFirst from 'lodash/upperFirst';
import SearchField from 'components/SearchField';
import { styled } from '@mui/system';
import { FilterActionType, FilterDispatch } from 'hooks/useExpandedFilters';

export type NotificationProductFilters = {
  selectedBrands: ConfigBrand[];
  selectedCategories: ConfigCategory[];
  selectedRetailers: ConfigRetailer[];
  search: string;
};

export const notificationProductFiltersInitialState: NotificationProductFilters = {
  selectedBrands: [],
  selectedCategories: [],
  selectedRetailers: [],
  search: '',
};

type Props = {
  filterDispatch: FilterDispatch<NotificationProductFilters>;
  filterState: NotificationProductFilters;
  brands: ConfigBrand[];
  categories: ConfigCategory[];
  retailers: ConfigRetailer[];
};

const StyledFiltersRow = styled('div')`
  display: flex;

  > div {
    margin-right: 20px;
    min-width: 250px;
  }

  > div:last-of-type {
    margin-left: auto;
    align-self: end;
  }
`;

const Filters: React.FC<Props> = ({
  filterState,
  filterDispatch,
  brands,
  categories,
  retailers,
}) => {
  const handleBrandsChange = useCallback(
    (value) => {
      filterDispatch({
        type: FilterActionType.SET,
        payload: {
          key: 'selectedBrands',
          value,
        },
      });
    },
    [filterDispatch],
  );

  const handleCategoriesChange = useCallback(
    (value) => {
      filterDispatch({
        type: FilterActionType.SET,
        payload: {
          key: 'selectedCategories',
          value,
        },
      });
    },
    [filterDispatch],
  );

  const handleRetailersChange = useCallback(
    (value) => {
      filterDispatch({
        type: FilterActionType.SET,
        payload: {
          key: 'selectedRetailers',
          value,
        },
      });
    },
    [filterDispatch],
  );

  const handleSearchChange = useCallback(
    (value) => {
      filterDispatch({
        type: FilterActionType.SET,
        payload: {
          key: 'search',
          value,
        },
      });
    },
    [filterDispatch],
  );

  const {
    selectedBrands,
    selectedCategories,
    selectedRetailers,
    search,
  } = filterState;

  return (
    <StyledFiltersRow>
      <SelectAllStateless
        initialOptions={categories}
        options={selectedCategories}
        label="Category"
        handleChange={handleCategoriesChange}
        selectAll={{ name: 'All', id: -1 }}
        getOptionLabel={(option) => (typeof option !== 'string' ? upperFirst(toLower(option.name)) : option)}
      />
      <SelectAllStateless
        options={selectedRetailers}
        initialOptions={retailers}
        label="Retailer"
        handleChange={handleRetailersChange}
        selectAll={{ name: 'All', id: -1, url: '' }}
        getOptionLabel={(option) => (typeof option !== 'string' ? option.name : option)}
      />
      <SelectAllStateless
        options={selectedBrands}
        initialOptions={brands}
        label="Brand"
        handleChange={handleBrandsChange}
        selectAll={{ name: 'All', id: -1 }}
        getOptionLabel={(option) => (typeof option !== 'string' ? option.name : option)}
      />
      <SearchField
        value={search}
        onChange={handleSearchChange}
        label="Search"
        id="product-search"
      />
    </StyledFiltersRow>
  );
};

export default Filters;
