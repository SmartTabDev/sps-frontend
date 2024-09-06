import {
  TriggerType, TriggerPriceType, TriggerVariation, TriggerValueType, TriggerValueTypeOption,
} from 'types/Notification';
import { TriggerPriceTypeOption } from '../components/Fields/TriggerPriceTypeSelect/TriggerPriceTypeSelect';
import { TriggerOption, TriggerSelectOptions } from '../components/Fields/TriggerSelect/TriggerSelectOptions';
import { TriggerValueTypes } from '../components/Fields/TriggerValueTypeSelect/TriggerValueTypeSelect';

export type TriggerFields = {
  anyMetricChange?: boolean;
  id?: number | string;
  trigger: TriggerOption | undefined | null;
  triggerPriceType?: TriggerPriceTypeOption | undefined;
  triggerValue: number | string | null;
  triggerValueType: TriggerValueTypeOption | undefined;
};

const mapFieldsToTrigger = (fields: TriggerFields): Partial<TriggerType> => {
  const {
    trigger, triggerPriceType, triggerValue, triggerValueType, id,
  } = fields;
  const triggerOptionValue = trigger?.value;
  const triggerPriceTypeOptionValue = triggerPriceType?.value as TriggerPriceType;
  let triggerValueTypeOptionValue = triggerValueType?.value as TriggerValueType | undefined;
  let priceType = triggerPriceTypeOptionValue;
  let variation: TriggerVariation = 'any';

  // I overwrite price type, but better solution will be add some hidden default option
  switch (triggerOptionValue) {
    case 'jumpsBy':
      variation = 'gte';
      priceType = 'price';
      break;
    case 'dropsBy':
      variation = 'lte';
      priceType = 'price';
      break;
    case 'anyChange':
      variation = 'any';
      priceType = 'price';
      break;
    case 'higherThan':
      variation = 'gte';
      if (!triggerValue) {
        triggerValueTypeOptionValue = undefined;
      }
      break;
    case 'lowerThan':
      variation = 'lte';
      if (!triggerValue) {
        triggerValueTypeOptionValue = undefined;
      }
      break;

    default:
      break;
  }

  const result = {
    id,
    value: (triggerValue || null) as any,
    valueType: triggerValueTypeOptionValue,
    priceType,
    variation,
  };

  return result;
};

const mapFieldsToTriggers = (fields: TriggerFields[]): TriggerType[] => {
  const result = fields
    .filter((x): x is TriggerFields => x !== undefined)
    .map(mapFieldsToTrigger) as TriggerType[];

  return result;
};

const mapTriggerToFields = (trigger: TriggerType): Partial<TriggerFields> => {
  const {
    priceType, variation, value, id, valueType,
  } = trigger;
  let triggerOption;

  let triggerValueType = TriggerValueTypes.find((t) => t.value === valueType);

  if (priceType === 'price') {
    switch (variation) {
      case 'gte':
        triggerOption = TriggerSelectOptions.find((t) => t.value === 'jumpsBy');

        break;
      case 'lte':
        triggerOption = TriggerSelectOptions.find((t) => t.value === 'dropsBy');

        break;
      case 'any':
        triggerOption = TriggerSelectOptions.find((t) => t.value === 'anyChange');

        break;

      default:
        break;
    }

    return {
      trigger: triggerOption,
      triggerValue: value as any,
      triggerValueType,
      id,
    };
  }

  if (priceType === 'rrp') {
    switch (variation) {
      case 'gte':
        triggerOption = TriggerSelectOptions.find((t) => t.value === 'higherThan');
        break;
      case 'lte':
        triggerOption = TriggerSelectOptions.find((t) => t.value === 'lowerThan');

        break;

      default:
        break;
    }

    if (!value) {
      triggerValueType = undefined;
    }

    return {
      triggerPriceType: { value: 'rrp', name: 'RRP' },
      trigger: triggerOption,
      triggerValue: value as any,
      triggerValueType,
      anyMetricChange: !!value,
      id,
    };
  }

  return { };
};

export { mapFieldsToTrigger, mapFieldsToTriggers, mapTriggerToFields };
