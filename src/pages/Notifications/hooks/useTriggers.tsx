import { useCallback, useState, useReducer, useMemo } from 'react';
import omit from 'lodash/omit';
import { TriggerType } from 'types/Notification';
import { mapFieldsToTrigger, TriggerFields } from '../utils/mapTrigger';

export enum TriggerActionType {
  RESET = 'RESET',
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  REMOVE = 'REMOVE',
  LOAD = 'LOAD',
  VALIDATE = 'VALIDATE',
  INVALIDATE = 'INVALIDATE',
}

type ResetAction = {
  type: TriggerActionType.RESET;
};

type AddAction = {
  type: TriggerActionType.ADD;
  payload: {
    id: string | number;
    value: TriggerFields;
  };
};

type UpdateAction = {
  type: TriggerActionType.UPDATE;
  payload: {
    id: string | number;
    value: Partial<TriggerFields>;
  };
};

type RemoveAction = {
  type: TriggerActionType.REMOVE;
  payload: {
    id: string | number;
  };
};

type LoadAction = {
  type: TriggerActionType.LOAD;
  payload: {
    value: TriggersState['fields'];
  };
};

type ValidateAction = {
  type: TriggerActionType.VALIDATE;
  payload: {
    ids: (string | number)[];
  };
};

type InvalidateAction = {
  type: TriggerActionType.INVALIDATE;
  payload: {
    id: string | number;
  };
};

export type TriggerActions =
  | AddAction
  | RemoveAction
  | ResetAction
  | UpdateAction
  | LoadAction
  | ValidateAction
  | InvalidateAction;

export const initialTriggerValueType = { name: 'amount', value: 'amount' };

export const initialTrigger = {
  trigger: null as any,
  triggerValue: null,
  triggerValueType: initialTriggerValueType,
  anyMetricChange: undefined,
};

export type TriggersState = {
  fields: {
    [key: string]: TriggerFields;
    [key: number]: TriggerFields;
  };
  idsToRemove: (string | number)[];
  idsToUpdate: (string | number)[];
  idsToAdd: (string | number)[];
  invalidIds: (string | number)[];
};

const createTriggersReducer =
  (initialState: TriggersState) =>
  (state: TriggersState, action: TriggerActions): TriggersState => {
    switch (action.type) {
      case TriggerActionType.RESET:
        return initialState;
      case TriggerActionType.LOAD:
        return {
          fields: action.payload.value,
          idsToAdd: [],
          idsToUpdate: [],
          idsToRemove: [],
          invalidIds: [],
        };
      case TriggerActionType.ADD:
        return {
          ...state,
          fields: {
            ...state.fields,
            [action.payload.id]: action.payload.value,
          },
          idsToAdd: [...state.idsToAdd, action.payload.id],
        };
      case TriggerActionType.UPDATE:
        return {
          ...state,
          fields: {
            ...state.fields,
            [action.payload.id]: {
              ...state.fields[action.payload.id],
              ...(action.payload.value as TriggerFields),
            },
          },
          idsToUpdate: [...state.idsToUpdate, action.payload.id],
        };
      case TriggerActionType.REMOVE:
        return {
          ...state,
          fields: omit(state.fields, [action.payload.id]),
          idsToRemove: [...state.idsToRemove, action.payload.id],
        };
      case TriggerActionType.VALIDATE:
        return {
          ...state,
          invalidIds: action.payload.ids,
        };
      case TriggerActionType.INVALIDATE:
        return {
          ...state,
          invalidIds: state.invalidIds.filter((id) => id !== action.payload.id),
        };
      default:
        return state;
    }
  };

export interface UseTriggers {
  state: TriggersState;
  handleResetTriggers: () => void;
  dispatch: React.Dispatch<TriggerActions>;
  refreshKey: string;
  triggerFields: Partial<TriggerType>[];
  validateTriggers: () => boolean;
}

// expanded filters state
const useTriggers = (initialState: TriggersState): UseTriggers => {
  const [refreshKey, setRefreshKey] = useState<number>(1);
  const filterReducer = createTriggersReducer(initialState);
  const [state, dispatch] = useReducer(filterReducer, initialState);

  const handleResetTriggers = useCallback(() => {
    setRefreshKey((key) => key + 1);
    dispatch({
      type: TriggerActionType.RESET,
    });
  }, []);

  const triggerFields = useMemo(() => {
    const result = state
      ? Object.values(state.fields).map(mapFieldsToTrigger)
      : state;

    return result;
  }, [state]);

  const isTriggerValid = useCallback(
    (id: string | number, trigger: TriggerFields) => {
      if (
        trigger.triggerValue === null ||
        trigger.triggerValue === '' ||
        trigger.triggerValue === undefined
      ) {
        if (trigger.anyMetricChange === false) {
          // don't validate RRP
        } else {
          return { isValid: false, id };
        }
      }

      return { isValid: true, id };
    },
    []
  );

  const validateTriggers = useCallback(() => {
    const entries = Object.entries(state.fields);

    const result = entries.map(([id, trigger]) =>
      isTriggerValid(id, trigger as TriggerFields)
    );
    const invalidIds = result
      .filter((item) => item.isValid === false)
      .map((item) => item.id);

    dispatch({
      type: TriggerActionType.VALIDATE,
      payload: {
        ids: invalidIds,
      },
    });

    if (invalidIds.length > 0) {
      return false;
    }

    return true;
  }, [state.fields, isTriggerValid]);

  return {
    state,
    handleResetTriggers,
    dispatch,
    refreshKey: String(refreshKey),
    triggerFields,
    validateTriggers,
  };
};

export default useTriggers;
