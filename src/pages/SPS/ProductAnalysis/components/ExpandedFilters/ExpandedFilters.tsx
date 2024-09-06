import React, { useCallback, useContext, useEffect } from 'react';
import Actions from 'components/FiltersDrawer/Actions';
import CheckboxGroup from 'components/CheckboxGroup/CheckboxGroup';
import CircularProgress from '@mui/material/CircularProgress';
import FieldWrapper, { FieldName } from 'components/FieldWrapper/FieldWrapper';
import FiltersDrawerContext from 'components/FiltersDrawer/FiltersDrawerContext';
import SelectAllStateless from 'components/SelectAll/SelectAllStateless';
import StatelessSlider from 'components/Slider/StatelessSlider';
import camelCase from 'lodash/camelCase';
import startCase from 'lodash/startCase';
import { ConfigContext } from 'contexts/ConfigContext';
import { FilterActionType, FilterDispatch } from 'hooks/useExpandedFilters';
import { Line } from 'components/Line/Line';
import { formatPriceFn } from 'components/FormatPrice/FormatPrice';
import { getSPSFilters } from 'reducers/config/actions';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { usePriceAnalysisPriceRange } from 'pages/SPS/hooks/usePriceAnalysisPriceRange';
import { PriceAnalysisFilters } from './types';

const StyledLine = styled(Line)`
  margin-top: 30px;
`;

export const spsFiltersInitialState: PriceAnalysisFilters = {
  availability: [],
  priceChange: [],
  timeframe: null,
  priceRange: null,
  selectedBrands: [],
  selectedCategories: [],
  selectedRetailers: [],
};

const priceChangeOptions: PriceAnalysisFilters['priceChange'] = [
  { name: 'All' },
  { name: 'Drops' },
  { name: 'Jumps' },
];
const availabilityOptions: PriceAnalysisFilters['availability'] = [
  { name: 'All' },
  { name: 'Available' },
  { name: 'Unavailable' },
];

type Props = {
  filterDispatch: FilterDispatch<PriceAnalysisFilters>;
  filterState: PriceAnalysisFilters;
  handleClear: () => void;
  handleApply: () => void;
  refreshKey: string;
};

const ExpandedFilters: React.FC<Props> = ({
  filterState,
  filterDispatch,
  handleClear,
  handleApply,
  refreshKey,
}) => {
  const dispatch = useDispatch();
  const { configId, regionCode } = useContext(ConfigContext);
  const {
    config: {
      spsFiltersLoading,
      sps: { brands, categories, retailers },
    },
  } = useSelector((state: RootState) => state);

  const {
    priceRange,
    selectedBrands,
    selectedCategories,
    selectedRetailers,
    timeframe,
  } = filterState;

  // set initial price range
  const initialPriceRange = usePriceAnalysisPriceRange(
    regionCode,
    filterDispatch,
    timeframe,
    refreshKey
  );

  // get sps filters (brands, categories, retailers)
  useEffect(() => {
    if (configId) {
      dispatch(getSPSFilters(configId));
    }
  }, [dispatch, configId]);

  const { isOpen, setOpen } = useContext(FiltersDrawerContext);

  const handleGo = useCallback(() => {
    if (setOpen) {
      setOpen(!isOpen);
    }

    handleApply();
  }, [isOpen, setOpen, handleApply]);

  const handlePricesChange = useCallback(
    (value) => {
      filterDispatch({
        type: FilterActionType.SET,
        payload: {
          key: 'priceChange',
          value,
        },
      });
    },
    [filterDispatch]
  );

  const handleProductsChange = useCallback(
    (value) => {
      filterDispatch({
        type: FilterActionType.SET,
        payload: {
          key: 'availability',
          value,
        },
      });
    },
    [filterDispatch]
  );

  const handlePriceRangeChange = useCallback(
    (value) => {
      filterDispatch({
        type: FilterActionType.SET,
        payload: {
          key: 'priceRange',
          value,
        },
      });
    },
    [filterDispatch]
  );

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
    [filterDispatch]
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
    [filterDispatch]
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
    [filterDispatch]
  );

  const handleClearAllFilters = useCallback(() => {
    handleClear();
  }, [handleClear]);

  if (!timeframe || !priceRange || !initialPriceRange || spsFiltersLoading) {
    return (
      <>
        <CircularProgress />
      </>
    );
  }

  const [min, max] = priceRange;

  return (
    <>
      <form noValidate>
        <FieldWrapper $marginTopSize="small">
          <SelectAllStateless
            options={selectedRetailers}
            initialOptions={retailers}
            label="Retailer"
            handleChange={handleRetailersChange}
            selectAll={{ name: 'All', id: -1, url: '' }}
            getOptionLabel={(option) =>
              typeof option !== 'string' ? option.name : option
            }
          />
        </FieldWrapper>
        <FieldWrapper $marginTopSize="small">
          <SelectAllStateless
            initialOptions={categories}
            options={selectedCategories}
            label="Category"
            handleChange={handleCategoriesChange}
            selectAll={{ name: 'All', id: -1 }}
            getOptionLabel={(option) =>
              typeof option !== 'string'
                ? startCase(camelCase(option.name))
                : option
            }
          />
        </FieldWrapper>
        <FieldWrapper $marginTopSize="small">
          <SelectAllStateless
            options={selectedBrands}
            initialOptions={brands}
            label="Brand"
            handleChange={handleBrandsChange}
            selectAll={{ name: 'All', id: -1 }}
            getOptionLabel={(option) =>
              typeof option !== 'string'
                ? startCase(camelCase(option.name))
                : option
            }
          />
        </FieldWrapper>
        <StyledLine height={1} background="#E4E6EC" />
        <FieldWrapper $marginTopSize="small">
          <FieldName tooltip="Filter data based on last data harvest">
            Products:
          </FieldName>
          <CheckboxGroup
            options={availabilityOptions}
            value={filterState.availability}
            onChange={handleProductsChange}
          />
        </FieldWrapper>
        <FieldWrapper $marginTopSize="small">
          <FieldName tooltip="Filter data based on last data harvest">
            Prices:
          </FieldName>
          <CheckboxGroup
            options={priceChangeOptions}
            value={filterState.priceChange}
            onChange={handlePricesChange}
          />
        </FieldWrapper>
        <StyledLine height={1} background="#E4E6EC" />
        <FieldWrapper $marginTopSize="small">
          <StatelessSlider
            name={
              <FieldName tooltip="Filter data based on last data harvest">
                Price Range:
              </FieldName>
            }
            min={0}
            max={initialPriceRange[1]}
            valueMin={min}
            valueMax={max}
            handleChange={handlePriceRangeChange}
            formatter={formatPriceFn}
          />
        </FieldWrapper>
        <Actions
          isDisabled={false}
          handleApply={handleGo}
          handleClear={handleClearAllFilters}
        />
      </form>
    </>
  );
};

export default ExpandedFilters;
