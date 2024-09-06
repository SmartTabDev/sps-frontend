import React, { useCallback, useContext } from 'react';
import FieldWrapper from 'components/FieldWrapper/FieldWrapper';
import SelectAllStateless from 'components/SelectAll/SelectAllStateless';
import camelCase from 'lodash/camelCase';
import startCase from 'lodash/startCase';
import { FilterActionType, FilterDispatch } from 'hooks/useExpandedFilters';
import FiltersDrawerContext from 'components/FiltersDrawer/FiltersDrawerContext';
import Actions from 'components/FiltersDrawer/Actions';
import { TimeDimension } from 'types/Cube';
import SelectTimeDimension from 'components/SelectTimeDimension/SelectTimeDimension';

export type OAMFilters = {
  selectedRetailers: { name: string; id: number }[];
  selectedCategories: { name: string; id: number }[];
  timeDimension: TimeDimension;
};

export const OAMFiltersInitialState: OAMFilters = {
  selectedRetailers: [],
  selectedCategories: [],
  timeDimension: {
    name: 'This year',
  },
};

type Props = {
  filterDispatch: FilterDispatch<OAMFilters>;
  filterState: OAMFilters;
  handleClear: () => void;
  handleApply: () => void;
  refreshKey: string;
  retailers: OAMFilters['selectedRetailers'];
  categories: OAMFilters['selectedCategories'];
};

const ExpandedFilters: React.FC<Props> = ({
  filterState,
  filterDispatch,
  handleApply,
  handleClear,
  retailers,
  categories,
  refreshKey,
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

  const handleTimeDimensionChange = useCallback(
    (value) => {
      filterDispatch({
        type: FilterActionType.SET,
        payload: {
          key: 'timeDimension',
          value,
        },
      });
    },
    [filterDispatch]
  );

  const { selectedRetailers, selectedCategories } = filterState;

  return (
    <>
      <form noValidate>
        <FieldWrapper $marginTopSize="small">
          <SelectTimeDimension
            timeDimension={filterState.timeDimension}
            handleTimeDimensionChange={handleTimeDimensionChange}
          />
        </FieldWrapper>
        <FieldWrapper $marginTopSize="small">
          <SelectAllStateless
            options={selectedRetailers}
            initialOptions={retailers}
            label="Retailer"
            handleChange={handleRetailersChange}
            selectAll={{ name: 'All', id: -1 }}
            getOptionLabel={(option) =>
              typeof option !== 'string' ? option.name : option
            }
          />
        </FieldWrapper>
        <FieldWrapper $marginTopSize="small">
          <SelectAllStateless
            options={selectedCategories}
            initialOptions={categories}
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
