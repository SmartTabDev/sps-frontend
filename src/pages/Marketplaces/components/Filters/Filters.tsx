import React, { useContext, useCallback, useEffect } from 'react';
import Actions from 'components/FiltersDrawer/Actions';
import FieldWrapper, { FieldName } from 'components/FieldWrapper/FieldWrapper';
import { ContentContainer } from 'components/FiltersDrawer/FiltersDrawer';
import MarketplaceContext from 'pages/Marketplaces/MarketplaceContext';
import SelectAllStateless from 'components/SelectAll/SelectAllStateless';
import StatelessSlider from 'components/Slider/StatelessSlider';
import { formatPriceFn } from 'components/FormatPrice/FormatPrice';
import { useCubeJsAPI } from 'pages/Marketplaces/hooks/useCubeJsAPI';
import { FilterActionType, FilterDispatch } from 'hooks/useExpandedFilters';
import useMarketplaceCubes from 'pages/Marketplaces/hooks/utils/useMarketplaceCubes';
import FiltersDrawerContext from 'components/FiltersDrawer/FiltersDrawerContext';
import startCase from 'lodash/startCase';
import camelCase from 'lodash/camelCase';
import { Badges } from 'components/Badges/Badges';
import { Line } from 'components/Line/Line';
import { styled } from '@mui/system';
import usePriceRangeQuery from './hooks/usePriceRangeQuery';
import usePositionRangeQuery from './hooks/usePositionRangeQuery';

const StyledLine = styled(Line)`
  margin-top: 30px;
`;

type Range = {
  min: number;
  max: number;
};

export interface ExpandedFilters {
  brand: { name: string }[];
  category: { name: string }[];
  badges: {
    [key: string]: boolean;
  };
  priceRange: Range;
  positionRange: Range;
  tags: {
    [key: string]: boolean;
  };
}

export const filtersInitialState = {
  brand: [],
  category: [],
  badges: {
    freeShipping: false,
    isPromotion: false,
    bidding: false,
    trophy: false,
  },
  priceRange: {
    min: 0,
    max: 0,
  },
  positionRange: {
    min: 0,
    max: 0,
  },
  tags: {},
};

type Props = {
  handleClear: () => void;
  handleApply: () => void;
  filters: ExpandedFilters;
  dispatch: FilterDispatch<ExpandedFilters>;
  runTime: string;
  refreshKey: string;
  ids: string[];
  brands: ({ name: string } | undefined)[];
};

const mapPriceRange = ({
  minPrice,
  maxPrice,
}: {
  minPrice: number;
  maxPrice: number;
}) => ({
  min: minPrice,
  max: maxPrice,
});

const mapPositionRange = ({
  minPosition,
  maxPosition,
}: {
  minPosition: number;
  maxPosition: number;
}) => ({
  min: minPosition,
  max: maxPosition,
});

const positionFormatter = (position: string | number) =>
  String(Number(position) + 1);

const Filters: React.FC<Props> = ({
  handleApply,
  handleClear,
  filters,
  dispatch,
  runTime,
  refreshKey,
  ids,
  brands,
}) => {
  const { marketplace, clientName } = useContext(MarketplaceContext);
  const cubes = useMarketplaceCubes(marketplace);
  const { isOpen, setOpen } = useContext(FiltersDrawerContext);
  // TODO: refactor or replace useCubeJsAPI
  // can't do anything with data, that rerenders a page infinitly

  // const filteredBrandsList = useMemo(() => brandsList.filter(
  //   (item): item is string => typeof item === 'string',
  // ), [brandsList]);

  // const brands: { name: string }[] = useMemo(
  //   () => filteredBrandsList.map((brand) => ({ name: brand })),
  //   [filteredBrandsList],
  // );

  // PRICE RANGE
  const priceRangeQuery = usePriceRangeQuery(cubes, runTime, ids);
  const { fetchData: fetchPriceRange, item: priceRange } = useCubeJsAPI<
    { min: number; max: number },
    { minPrice: number; maxPrice: number }
  >('priceRange', priceRangeQuery, [], mapPriceRange);

  // CLIENT POSITION RANGE
  const clientPositionRangeQuery = usePositionRangeQuery(
    cubes,
    runTime,
    ids,
    clientName
  );
  const { fetchData: fetchClientPositionRange, item: clientPositionRange } =
    useCubeJsAPI<
      { min: number; max: number },
      { minPosition: number; maxPosition: number }
    >('clientPosition', clientPositionRangeQuery, [], mapPositionRange);

  // FETCH INITIAL FILTERS OPTIONS
  useEffect(() => {
    if (runTime && ids.length) {
      fetchPriceRange();
      fetchClientPositionRange();
    }
  }, [runTime, fetchPriceRange, fetchClientPositionRange, ids]);

  const handlePriceRangeChange = useCallback(
    ([min, max]) => {
      dispatch({
        type: FilterActionType.SET,
        payload: {
          key: 'priceRange',
          value: {
            min,
            max,
          },
        },
      });
    },
    [dispatch]
  );

  const handlePositionRangeChange = useCallback(
    ([min, max]) => {
      dispatch({
        type: FilterActionType.SET,
        payload: {
          key: 'positionRange',
          value: {
            min,
            max,
          },
        },
      });
    },
    [dispatch]
  );

  const handleBrandChange = useCallback(
    (value) => {
      dispatch({
        type: FilterActionType.SET,
        payload: {
          key: 'brand',
          value,
        },
      });
    },
    [dispatch]
  );

  const handleBadgesChange = useCallback(
    (value) => {
      dispatch({
        type: FilterActionType.SET,
        payload: {
          key: 'badges',
          value,
        },
      });
    },
    [dispatch]
  );

  const handleGo = useCallback(() => {
    if (setOpen) {
      setOpen(!isOpen);
    }

    handleApply();
  }, [isOpen, setOpen, handleApply]);

  const { badges } = filters;

  return (
    <ContentContainer>
      {filters && (
        <>
          {brands && (
            <FieldWrapper $marginTopSize="small">
              <SelectAllStateless<{ name: string }, false, false>
                getOptionLabel={(option) => startCase(camelCase(option.name))}
                label="Select brand"
                limitTags={1}
                options={filters.brand}
                initialOptions={brands}
                selectAll={{ name: 'All' }}
                handleChange={handleBrandChange}
                key={refreshKey}
              />
            </FieldWrapper>
          )}

          {marketplace === 'ceneo' && (
            <>
              <StyledLine height={1} background="#E4E6EC" />
              <FieldWrapper $marginTopSize="small">
                <>
                  <Badges
                    size={24}
                    freeShipping={badges.freeShipping}
                    isPromotion={badges.isPromotion}
                    bidding={badges.bidding}
                    trophy={badges.trophy}
                    handleClick={handleBadgesChange}
                    hideIsSponsored
                    showAll
                  />
                </>
              </FieldWrapper>
            </>
          )}
          {priceRange && (
            <FieldWrapper $marginTopSize="small">
              <StatelessSlider
                name={<FieldName>Price Range</FieldName>}
                formatter={formatPriceFn}
                min={priceRange.min}
                max={priceRange.max}
                valueMin={filters.priceRange.min}
                valueMax={filters.priceRange.max}
                handleChange={handlePriceRangeChange}
              />
            </FieldWrapper>
          )}
          {clientPositionRange ? (
            <FieldWrapper $marginTopSize="small">
              <StatelessSlider
                name={<FieldName>Postion Range</FieldName>}
                min={clientPositionRange.min}
                max={clientPositionRange.max}
                valueMin={filters.positionRange.min}
                valueMax={filters.positionRange.max}
                handleChange={handlePositionRangeChange}
                formatter={positionFormatter}
              />
            </FieldWrapper>
          ) : null}
        </>
      )}
      <Actions
        isDisabled={false}
        handleApply={handleGo}
        handleClear={handleClear}
      />
    </ContentContainer>
  );
};

export default Filters;
