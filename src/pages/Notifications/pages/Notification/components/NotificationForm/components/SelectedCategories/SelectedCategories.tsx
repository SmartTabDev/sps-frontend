import React, { useState, useEffect } from 'react';
import RoundPanel from 'pages/Marketplaces/components/RoundPanel';
import Grid from '@mui/material/Grid';
import { ConfigBrand, ConfigCategory, ConfigRetailer } from 'types/AppConfig';
import BaseDataGrid from 'pages/Notifications/components/BaseDataGrid/BaseDataGrid';
import { DataGridProps } from '@mui/x-data-grid';
import { UseAlertForm } from 'pages/Notifications/hooks/useAlertForm';
import { styled } from '@mui/system';
import ButtonPopover, {
  StyledButtonOption,
} from 'components/ButtonPopover/ButtonPopover';
import startCase from 'lodash/startCase';
import Button from 'components/Button';
import Close from 'components/Close';
import {
  UseCustomCategoriesFilters,
  AlertProductFilters,
} from 'pages/Notifications/pages/Notification/hooks/useCustomCategoriesFilters';

const AddFilterPanel = styled(RoundPanel)`
  height: 100%;
  padding: 46px;
  text-align: center;
  background: rgb(228 230 236 / 30%);
  box-shadow: initial;
  border: 1px dashed rgb(130 130 130 / 30%);

  p {
    font-family: 'Lato';
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    opacity: 0.8;
    margin: 0;
    margin-bottom: 40px;
  }
`;

const CloseButtonWrapper = styled('span')`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 999;
  cursor: pointer;
`;

const categoryColumns: DataGridProps['columns'] = [
  {
    field: 'id',
    type: 'string',
  },
  {
    field: 'name',
    headerName: 'Category',
    type: 'string',
    flex: 1,
  },
];

const brandColumns: DataGridProps['columns'] = [
  {
    field: 'id',
    type: 'string',
  },
  {
    field: 'name',
    headerName: 'Brand',
    type: 'string',
    flex: 1,
  },
];

const retailersColumns: DataGridProps['columns'] = [
  {
    field: 'id',
    type: 'string',
  },
  {
    field: 'name',
    headerName: 'Retailer',
    type: 'string',
    flex: 1,
  },
];

type Props = {
  retailers: ConfigRetailer[];
  categories: ConfigCategory[];
  brands: ConfigBrand[];
  alertForm: UseAlertForm;
  customCategoriesFilters: UseCustomCategoriesFilters;
};

const SelectedCategories: React.FC<Props> = (props) => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const { categories, brands, retailers, customCategoriesFilters, alertForm } =
    props;

  const { state: alertState, handleSet } = alertForm;

  const { state, dispatch, allAvailableFilters } = customCategoriesFilters;
  const { filters } = state;

  const {
    fields: {
      categories: selectedCategories,
      brands: selectedBrands,
      retailers: selectedRetailers,
    },
    errors: {
      categories: categoriesErrors,
      brands: brandsErrors,
      retailers: retailersErrors,
    },
  } = alertState;

  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true);

      const categoryFilter = Boolean(selectedCategories.length);
      const retailerFilter = Boolean(selectedRetailers.length);
      const brandFilter = Boolean(selectedBrands.length);

      const initialFilters = [
        categoryFilter ? ('category' as const) : undefined,
        retailerFilter ? ('retailer' as const) : undefined,
        brandFilter ? ('brand' as const) : undefined,
      ];

      dispatch({ type: 'reset', filters: initialFilters });
    }
  }, [
    selectedCategories.length,
    selectedBrands.length,
    selectedRetailers.length,
    isInitialized,
    dispatch,
  ]);

  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      sx={{ minHeight: 400 }}
    >
      {filters.slice(0, 3).map((filter) => {
        if (filter === 'category') {
          return (
            <Grid item xs={4} key="category" style={{ position: 'relative' }}>
              <CloseButtonWrapper
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({ type: 'remove', filter: 'category' });
                  handleSet({ key: 'categories', value: [] });
                }}
                role="none"
                data-testid="remove-category"
              >
                <Close />
              </CloseButtonWrapper>
              <RoundPanel $error={Boolean(categoriesErrors)}>
                <BaseDataGrid
                  rows={categories}
                  columns={categoryColumns}
                  checkboxSelection
                  onRowSelectionModelChange={(newSelectionModel) => {
                    handleSet({ key: 'categories', value: newSelectionModel });
                  }}
                  rowSelectionModel={alertState.fields.categories}
                  height={60}
                  initialState={{
                    columns: {
                      columnVisibilityModel: {
                        id: false,
                      },
                    },
                  }}
                />
              </RoundPanel>
            </Grid>
          );
        }

        if (filter === 'retailer') {
          return (
            <Grid item xs={4} key="retailer" style={{ position: 'relative' }}>
              <RoundPanel $error={Boolean(retailersErrors)}>
                <CloseButtonWrapper
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch({ type: 'remove', filter: 'retailer' });
                    handleSet({ key: 'retailers', value: [] });
                  }}
                  role="none"
                  data-testid="remove-retailer"
                >
                  <Close />
                </CloseButtonWrapper>
                <BaseDataGrid
                  rows={retailers}
                  columns={retailersColumns}
                  checkboxSelection
                  onRowSelectionModelChange={(newSelectionModel) => {
                    handleSet({ key: 'retailers', value: newSelectionModel });
                  }}
                  rowSelectionModel={alertState.fields.retailers}
                  height={60}
                  initialState={{
                    columns: {
                      columnVisibilityModel: {
                        id: false,
                      },
                    },
                  }}
                />
              </RoundPanel>
            </Grid>
          );
        }

        if (filter === 'brand') {
          return (
            <Grid item xs={4} key="brand" style={{ position: 'relative' }}>
              <CloseButtonWrapper
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({ type: 'remove', filter: 'brand' });
                  handleSet({ key: 'brands', value: [] });
                }}
                role="none"
                data-testid="remove-brand"
              >
                <Close />
              </CloseButtonWrapper>
              <RoundPanel $error={Boolean(brandsErrors)}>
                <BaseDataGrid
                  rows={brands}
                  columns={brandColumns}
                  checkboxSelection
                  onRowSelectionModelChange={(newSelectionModel) => {
                    handleSet({ key: 'brands', value: newSelectionModel });
                  }}
                  rowSelectionModel={alertState.fields.brands}
                  height={60}
                />
              </RoundPanel>
            </Grid>
          );
        }

        const lastFilter = allAvailableFilters.find(
          (f) => !filters.find((cf) => cf === f)
        );

        if (filter === undefined) {
          return (
            <Grid item xs={4} key="add">
              <AddFilterPanel color="#E4E6EC" style={{ height: '60vh' }}>
                <p>
                  Configure your tracking filters using, categories, retailers
                  and brands filters. Make sure you have made selection before
                  saving.
                </p>
                {filters.length === 3 ? (
                  <Button
                    size="medium"
                    onClick={() => {
                      if (lastFilter) {
                        dispatch({
                          type: 'add',
                          filter: lastFilter as AlertProductFilters,
                        });
                      }
                    }}
                  >
                    + Add {startCase(lastFilter)}
                  </Button>
                ) : null}
                {filters.length <= 2 ? (
                  <ButtonPopover buttonText="+ Add filter" key={filters.length}>
                    {allAvailableFilters
                      .filter((f) => !filters.find((cf) => cf === f))
                      .map((currentFilter) => (
                        <StyledButtonOption
                          key={currentFilter}
                          onClick={() => {
                            if (currentFilter) {
                              dispatch({
                                type: 'add',
                                filter: currentFilter as AlertProductFilters,
                              });
                            }
                          }}
                        >
                          {startCase(currentFilter)}
                        </StyledButtonOption>
                      ))}
                  </ButtonPopover>
                ) : null}
              </AddFilterPanel>
            </Grid>
          );
        }

        return null;
      })}
    </Grid>
  );
};

export default SelectedCategories;
