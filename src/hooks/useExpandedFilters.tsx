import { useCallback, useState, useReducer } from 'react';

export enum FilterActionType {
  RESET = 'RESET',
  SET = 'SET',
}

type ResetAction = {
  type: FilterActionType.RESET;
};

type SetActions<S> = {
  type: FilterActionType.SET;
  payload: { [K in keyof S]: { key: K; value: S[K] } }[keyof S];
};

type Actions<S> = SetActions<S> | ResetAction;

const createFilterReducer =
  <S,>(initialState: S) =>
  (state: S, action: Actions<S>): S => {
    switch (action.type) {
      case FilterActionType.RESET:
        return initialState;

      case FilterActionType.SET:
        return {
          ...state,
          [action.payload.key]: action.payload.value,
        };
      default:
        return state;
    }
  };

interface UseAdvancedFilters<S> {
  state: S;
  requestState: S;
  handleClear: () => void;
  handleApply: () => void;
  dispatch: (action: Actions<S>, addToRequestState?: boolean) => void;
  refreshKey: string;
}

export type FilterDispatch<S> = (
  value: Actions<S>,
  addToRequestState?: boolean
) => void;

// expanded filters state
const useExpandedFilters = <S,>(
  initialState: S,
  applyCallback?: () => void
): UseAdvancedFilters<S> => {
  const [refreshKey, setRefreshKey] = useState<number>(1);
  const filterReducer = createFilterReducer<S>(initialState);
  const [state, dispatch] = useReducer(filterReducer, initialState);
  const [requestState, setRequestState] = useState<S>(state);

  const handleClear = useCallback(() => {
    setRefreshKey((key) => key + 1);
    dispatch({
      type: FilterActionType.RESET,
    });
    setRequestState(initialState);
  }, [initialState]);

  const handleApply = useCallback(() => {
    setRequestState(state);

    if (applyCallback) {
      applyCallback();
    }
  }, [state, applyCallback]);

  const handleDispatch = useCallback(
    (action: Actions<S>, addToRequestState = false) => {
      dispatch(action);

      if (addToRequestState && action.type === 'SET') {
        setRequestState((prevState) => ({
          ...prevState,
          [action.payload.key]: action.payload.value,
        }));
      }
    },
    [dispatch]
  );

  return {
    state,
    requestState,
    handleClear,
    handleApply,
    dispatch: handleDispatch,
    refreshKey: String(refreshKey),
  };
};

export default useExpandedFilters;
