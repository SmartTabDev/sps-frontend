import React, { useCallback, useContext } from 'react';
import FieldWrapper, { FieldName } from 'components/FieldWrapper/FieldWrapper';
// import SelectAllStateless from 'components/SelectAll/SelectAllStateless';
// import camelCase from 'lodash/camelCase';
// import startCase from 'lodash/startCase';
import { FilterActionType, FilterDispatch } from 'hooks/useExpandedFilters';
import FiltersDrawerContext from 'components/FiltersDrawer/FiltersDrawerContext';
import StatelessSlider from 'components/Slider/StatelessSlider';
import { Line } from 'components/Line/Line';
import { styled } from '@mui/system';
import { formatPriceFn } from 'components/FormatPrice/FormatPrice';
import Actions from 'components/FiltersDrawer/Actions';
import { Badges } from 'components/Badges/Badges';

const StyledLine = styled(Line)`
  margin-top: 30px;
`;

export type ShopeeFilters = {
  searchFilter: string;
  selectedBrands: { name: string; id: number }[];
  priceRange: [number, number] | null;
  badges: {
    [key: string]: boolean;
  };
};

export const shopeeFiltersInitialState: ShopeeFilters = {
  searchFilter: '',
  selectedBrands: [],
  priceRange: null,
  badges: {
    trophy: false,
    isSponsored: false,
    bidding: false,
    freeShipping: false,
  },
};

type Props = {
  filterDispatch: FilterDispatch<ShopeeFilters>;
  filterState: ShopeeFilters;
  handleClear: () => void;
  handleApply: () => void;
  //   refreshKey: string;
  //   brands: { name: string; id: number }[];
  prices: [number, number] | null;
};

const ExpandedFilters: React.FC<Props> = ({
  filterState,
  filterDispatch,
  handleApply,
  handleClear,
  //   refreshKey,
  //   brands,
  prices,
}) => {
  const { isOpen, setOpen } = useContext(FiltersDrawerContext);

  const handleGo = useCallback(() => {
    if (setOpen) {
      setOpen(!isOpen);
    }

    handleApply();
  }, [isOpen, setOpen, handleApply]);

  const handleClearAllFilters = useCallback(() => {
    handleClear();
  }, [handleClear]);

  //   const handleBrandsChange = useCallback(
  //     (value) => {
  //       filterDispatch({
  //         type: FilterActionType.SET,
  //         payload: {
  //           key: 'selectedBrands',
  //           value,
  //         },
  //       });
  //     },
  //     [filterDispatch]
  //   );

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

  const handleBadgesChange = useCallback(
    (value) => {
      filterDispatch({
        type: FilterActionType.SET,
        payload: {
          key: 'badges',
          value,
        },
      });
    },
    [filterDispatch]
  );

  const { priceRange, selectedBrands, badges } = filterState;

  return (
    <>
      <form noValidate>
        {/* <FieldWrapper $marginTopSize="small">
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
        <StyledLine height={1} background="#E4E6EC" /> */}
        {prices && prices[0] !== undefined ? (
          <FieldWrapper $marginTopSize="small">
            <StatelessSlider
              name={
                <FieldName tooltip="Filter data based on last data harvest">
                  Price Range:
                </FieldName>
              }
              min={prices[0]}
              max={prices[1]}
              valueMin={(priceRange || [])[0] || prices[0]}
              valueMax={(priceRange || [])[1] || prices[1]}
              handleChange={handlePriceRangeChange}
              formatter={formatPriceFn}
            />
          </FieldWrapper>
        ) : null}
        <StyledLine height={1} background="#E4E6EC" />
        <FieldWrapper $marginTopSize="small">
          <>
            <Badges
              size={24}
              bidding={badges.bidding}
              freeShipping={badges.freeShipping}
              handleClick={handleBadgesChange}
              showAll
              biddingTooltipTitle="Superseller"
              freeShippingTooltipTitle="Free delivery"
              hideIsPromotion
              hideIsSponsored
              hideTrophy
            />
          </>
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
