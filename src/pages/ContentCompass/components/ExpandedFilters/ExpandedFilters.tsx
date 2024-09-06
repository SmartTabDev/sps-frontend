import React, { useCallback, useContext } from 'react';
import FiltersDrawerContext from 'components/FiltersDrawer/FiltersDrawerContext';
import Actions from 'components/FiltersDrawer/Actions';

export type ContentCompassFilters = {
  searchFilter: string;
};

export const contentCompassFiltersInitialState: ContentCompassFilters = {
  searchFilter: '',
};

type Props = {
  //   filterDispatch: FilterDispatch<ContentCompassFilters>;
  //   filterState: ContentCompassFilters;
  handleClear: () => void;
  handleApply: () => void;
  //   refreshKey: string;
};

const ExpandedFilters: React.FC<Props> = ({
  //   filterState,
  //   filterDispatch,
  handleApply,
  handleClear,
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

  return (
    <>
      <form noValidate>
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
