import { useCallback, useReducer } from 'react';

export type AlertProductFilters = 'category' | 'brand' | 'retailer' | undefined;

type State = {
  filters: AlertProductFilters[];
};

type Action =
  | { type: 'add'; filter: AlertProductFilters }
  | { type: 'remove'; filter: AlertProductFilters }
  | { type: 'reset'; filters: AlertProductFilters[] };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        filters: [...state.filters.filter(Boolean), action.filter, undefined],
      };
    case 'remove':
      return {
        ...state,
        filters: state.filters.filter((f) => f !== action.filter),
      };
    case 'reset':
      return {
        ...state,
        filters: [...action.filters.filter(Boolean), undefined],
      };
    default:
      return state;
  }
};

const allAvailableFilters = [
  'category' as const,
  'retailer' as const,
  'brand' as const,
];

export type UseCustomCategoriesFilters = {
  state: State;
  dispatch: React.Dispatch<Action>;
  allAvailableFilters: Exclude<AlertProductFilters, undefined>[];
  handleResetFilters: () => void;
};

const useCustomCategoriesFilters = (): UseCustomCategoriesFilters => {
  const [state, dispatch] = useReducer(reducer, {
    filters: [undefined],
  });

  const handleResetFilters = useCallback(() => {
    dispatch({ type: 'reset', filters: [undefined] });
  }, [state.filters]);

  return {
    state,
    dispatch,
    allAvailableFilters,
    handleResetFilters,
  };
};

export default useCustomCategoriesFilters;
