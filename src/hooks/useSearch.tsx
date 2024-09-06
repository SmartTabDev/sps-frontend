import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import useExpandedFilters, { FilterActionType } from './useExpandedFilters';

export type SearchFilter = {
  searchFilter: string;
};

export const searchFilterInitialState: SearchFilter = {
  searchFilter: '',
};

export const useSearch = () => {
  const {
    dispatch: filterDispatch,
    state: filterState,
    requestState,
    handleApply,
  } = useExpandedFilters<SearchFilter>(searchFilterInitialState);

  const { searchFilter: requestSearchFilter } = requestState;
  const { searchFilter } = filterState;

  const handleSearchChange = useCallback(
    (value, send = false) => {
      filterDispatch(
        {
          type: FilterActionType.SET,
          payload: {
            key: 'searchFilter',
            value,
          },
        },
        send
      );
    },
    [filterDispatch]
  );

  const handleSearchSubmit = useCallback(() => {
    handleApply();
  }, [handleApply]);

  const handleSearchClear = useCallback(() => {
    handleSearchChange('', true);
  }, [handleSearchChange]);

  const { enqueueSnackbar } = useSnackbar();

  // on empty search result callback
  const handleEmptySearchResult = useCallback(() => {
    enqueueSnackbar('There is no data matching your query.', {
      variant: 'error',
      autoHideDuration: 3000,
    });
  }, [enqueueSnackbar]);

  return {
    searchFilter,
    requestSearchFilter,
    handleSearchSubmit,
    handleSearchClear,
    handleSearchChange,
    handleEmptySearchResult,
  };
};
