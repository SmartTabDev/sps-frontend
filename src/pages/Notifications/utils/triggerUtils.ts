import { TriggerType } from 'types/Notification';
import { mapFieldsToTriggers, TriggerFields } from './mapTrigger';

const getFields = <T>(items: { [key: string]: T }, ids: (string | number)[]): T[] => {
  const result = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const id of ids) {
    if (items[id]) {
      const item = items[id];
      result.push(item as T);
    }
  }

  return result;
};

const isTemporaryTriggerId = (x: string | number): x is number => String(x).startsWith('t-');
const isTriggerId = (x: string | number): x is number => !String(x).startsWith('t-');

type Items = {
    [key: string]: TriggerFields;
    [key: number]: TriggerFields;
}

const getTriggersToSave = (
  items: Items,
  ids: (string | number)[],
): TriggerType[] => {
  if (ids.length) {
    const filteredIds = ids.filter(isTemporaryTriggerId);
    const fields = getFields(items, filteredIds);
    const triggers = mapFieldsToTriggers(fields);

    return triggers;
  }

  return [];
};

const getTriggersToUpdate = (
  items: Items,
  ids: (string | number)[],
): TriggerType[] => {
  if (ids.length) {
    const filteredIds = ids.filter(isTriggerId);
    const fields = getFields(items, filteredIds);
    const triggers = mapFieldsToTriggers(fields);

    return triggers;
  }

  return [];
};

export {
  getFields, isTemporaryTriggerId, isTriggerId, getTriggersToSave, getTriggersToUpdate,
};
