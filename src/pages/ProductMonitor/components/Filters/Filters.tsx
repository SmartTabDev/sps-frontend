import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import FiltersDrawer, {
  ScrollBox,
} from 'components/FiltersDrawer/FiltersDrawer';
import {
  ProductMonitorCategory,
  ProductMonitorFeature,
  ProductMonitorFilters,
  ProductMonitorRetailer,
  ProductMonitorRun,
} from 'pages/ProductMonitor/types';
import { useProductMonitorBrands } from 'pages/ProductMonitor/hooks/useProductMonitorBrands';
import { useProductMonitorPriceRange } from 'pages/ProductMonitor/hooks/useProductMonitorPriceRange';
import Slider from 'components/Slider/Slider';
import { formatPriceFn } from 'components/FormatPrice/FormatPrice';
import get from 'lodash/get';
import startCase from 'lodash/startCase';
import camelCase from 'lodash/camelCase';
import { useThrottleFn } from 'react-use';
import Actions from 'components/FiltersDrawer/Actions';
import FieldWrapper from 'components/FieldWrapper/FieldWrapper';
import SelectAllStateless from 'components/SelectAll/SelectAllStateless';
import { ConfigContext } from 'contexts/ConfigContext';
import FiltersDrawerPlaced from 'components/FiltersDrawer/FiltersDrawerPlaced';
import AdvancedFilters from './AdvancedFilters';
import InputRow from './InputRow.styled';

type Props = {
  handleChange: React.Dispatch<React.SetStateAction<ProductMonitorFilters>>;
  resetFilter: () => void;
  run?: ProductMonitorRun;
  retailers?: ProductMonitorRetailer[];
  category?: ProductMonitorCategory;
  features?: ProductMonitorFeature[];
  searchValue: string;
};

type AutocompleteBrand = { name: string; value: string };

const mapRetailerOptions = (retailer: ProductMonitorRetailer) => ({
  ...retailer,
  name: retailer.name.toUpperCase(),
});

const mapBrandsOptions = (brand: string) => ({
  name: brand.toUpperCase(),
  value: brand,
});

const Filters: React.FC<Props> = ({
  retailers = [],
  handleChange,
  run,
  category,
  features,
  resetFilter,
  searchValue,
}) => {
  const { regionCode } = useContext(ConfigContext);
  const [clearKey, setClearKey] = useState<string>('');
  const [throttledSearchValue, setThrottledSearchValue] = useState<string>('');
  const brands = useProductMonitorBrands(regionCode, run, retailers, category);

  const [clearPriceRange, setClearPriceRange] = useState<boolean>(false);

  const [filteredBrands, setBrands] = useState<AutocompleteBrand[]>([]);
  const [filteredRetailers, setRetailers] = useState<ProductMonitorRetailer[]>(
    []
  );
  const [filteredPriceRange, setFilteredPriceRange] = useState<
    [number, number] | undefined
  >();
  const [filteredFeaturesRows, setFilteredFeaturesRows] = useState<
    ProductMonitorFeature[]
  >([]);
  const [filteredFeatures, setFilteredFeatures] = useState<
    ProductMonitorFeature[]
  >([]);

  const brandsFilter = useMemo(
    () => filteredBrands.map((brand) => get(brand, 'value')),
    [filteredBrands]
  );

  const priceRange = useProductMonitorPriceRange(
    regionCode,
    run,
    filteredRetailers.length ? filteredRetailers : retailers,
    category,
    brandsFilter.length ? brandsFilter : brands
  );

  const brandsOptions = useMemo(
    () => (brands || []).map(String).map(mapBrandsOptions),
    [brands]
  );

  const retailersOptions = useMemo(
    () => (retailers || []).map(mapRetailerOptions),
    [retailers]
  );

  const applyFilter = useCallback(
    (
      brandsToApply: AutocompleteBrand[],
      retailersToApply: ProductMonitorRetailer[] = [],
      priceRangeToApply?: [number, number],
      featuresToApply: ProductMonitorFeature[] = []
    ) => {
      const brandIds = brandsToApply.map((item) => item.value);
      const finalRetailers = retailersToApply.length
        ? retailersToApply
        : retailers || [];
      const [minPrice, maxPrice] = priceRangeToApply || [];
      const range = minPrice && maxPrice ? { minPrice, maxPrice } : undefined;

      handleChange((data) => ({
        ...data,
        retailers: finalRetailers,
        brands: brandIds,
        priceRange: range,
        features: featuresToApply,
      }));
    },
    [handleChange, retailers.length]
  );

  const clearAllValues = useCallback(() => {
    setClearKey((key) => String(key + 1));
    setBrands([]);
    setRetailers([]);
    setClearPriceRange(true);
    setFilteredPriceRange(undefined);
    setFilteredFeaturesRows([]);
    setFilteredFeatures([]);
    applyFilter([], [], undefined, undefined);
  }, [applyFilter]);

  const handleClear = () => {
    clearAllValues();
  };

  useEffect(() => {
    clearAllValues();
    resetFilter();
  }, [category, resetFilter, clearAllValues]);

  // set products filter
  useEffect(() => {
    handleChange((oldFilters) => ({
      ...oldFilters,
      search: throttledSearchValue,
    }));
  }, [throttledSearchValue, handleChange]);

  useThrottleFn(
    (val) => {
      setThrottledSearchValue(val);
    },
    2000,
    [searchValue]
  );

  return (
    <FiltersDrawerPlaced title="Filters">
      <ScrollBox>
        <FieldWrapper $marginTopSize="big">
          <InputRow>
            {retailers ? (
              <SelectAllStateless<typeof retailers[0], false, false>
                getOptionLabel={(option) => startCase(camelCase(option.name))}
                label="Select retailer"
                limitTags={1}
                options={filteredRetailers}
                initialOptions={retailersOptions}
                selectAll={{ name: 'All', id: -1 }}
                handleChange={setRetailers}
                key={`${clearKey}-${category?.name}-retailers`}
              />
            ) : (
              'Loading...'
            )}
            {brands ? (
              <SelectAllStateless<{ name: string; value: string }, false, false>
                getOptionLabel={(option) => startCase(camelCase(option.name))}
                label="Select brand"
                limitTags={1}
                options={filteredBrands}
                initialOptions={brandsOptions}
                selectAll={{ name: 'All', value: '' }}
                handleChange={setBrands}
                key={`${clearKey}-${category?.name}-brands`}
              />
            ) : (
              'Loading...'
            )}
          </InputRow>
        </FieldWrapper>
        <FieldWrapper $marginTopSize="small">
          <Slider
            formatter={formatPriceFn}
            min={priceRange?.minPrice}
            max={priceRange?.maxPrice}
            forceClear={clearPriceRange}
            setForceClear={setClearPriceRange}
            handleChange={setFilteredPriceRange}
            isLoading={priceRange === undefined}
            loadingText="Loading..."
          />
        </FieldWrapper>
        {(features && features.length) || filteredFeatures.length ? (
          <AdvancedFilters
            initialFeatures={features}
            filteredFeaturesRows={filteredFeaturesRows}
            setFilteredFeaturesRows={setFilteredFeaturesRows}
            filteredFeatures={filteredFeatures}
            setFilteredFeatures={setFilteredFeatures}
          />
        ) : null}
      </ScrollBox>
      <Actions
        isDisabled={
          filteredBrands.length === brands?.length &&
          filteredRetailers.length === (retailers || []).length &&
          !priceRange?.minPrice &&
          !priceRange?.maxPrice
        }
        handleClear={handleClear}
        handleApply={() =>
          applyFilter(
            filteredBrands,
            filteredRetailers,
            filteredPriceRange,
            filteredFeatures
          )
        }
      />
    </FiltersDrawerPlaced>
  );
};

export default Filters;
