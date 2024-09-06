// TODO

import { TriggerType } from 'types/Notification';
import { mapFieldsToTrigger, mapTriggerToFields } from './mapTrigger';

// 1. Zrobic wczytywanie triggerow z Api
// 2. Dodac usuwanie triggerow w API przy edycji
// 3. Dodac aktualzacje trigerow

// Map Fields to Triggers

const state = {
  1: {
    trigger: {
      name: 'Price drops by',
      value: 'dropsBy',
    },
    anyMetricChange: false,
    triggerValue: 500,
    triggerValueType: {
      name: 'amount',
      value: 'amount',
    },
    triggerPriceType: {
      name: 'RRP',
      value: 'rrp',
    },
  },
  2: {
    trigger: {
      name: 'Price jumps by',
      value: 'jumpsBy',
    },
    anyMetricChange: false,
    triggerValue: 30,
    triggerValueType: {
      name: 'percent',
      value: 'percent',
    },
    triggerPriceType: {
      name: 'RRP',
      value: 'rrp',
    },
  },
  3: {
    trigger: {
      name: 'Price lower than',
      value: 'lowerThan',
    },
    anyMetricChange: false,
    triggerValue: '',
    triggerValueType: {
      name: 'amount',
      value: 'amount',
    },
    triggerPriceType: {
      name: 'RRP',
      value: 'rrp',
    },
  },
  4: {
    trigger: {
      name: 'Price higher than',
      value: 'higherThan',
    },
    anyMetricChange: false,
    triggerValue: 10,
    triggerValueType: {
      name: 'percent',
      value: 'percent',
    },
    triggerPriceType: {
      name: 'RRP',
      value: 'rrp',
    },
  },
  5: {
    trigger: {
      name: 'Any price change by',
      value: 'anyChange',
    },
    anyMetricChange: false,
    triggerValue: 100,
    triggerValueType: {
      name: 'amount',
      value: 'amount',
    },
    triggerPriceType: {
      name: 'RRP',
      value: 'rrp',
    },
  },
};

describe('Map Fields to Triggers - Drops/Jumps', () => {
  const triggers = Object.values(state).map(mapFieldsToTrigger);

  test('priceType is price', () => {
    expect(triggers[0]?.priceType).toBe('price');
    expect(triggers[1]?.priceType).toBe('price');
  });

  test('Amount', () => {
    expect(triggers[0]?.value).toBe(500);
    expect(triggers[1]?.value).toBe(30);
  });

  test('Value Type', () => {
    expect(triggers[0]?.valueType).toBe('amount');
    expect(triggers[1]?.valueType).toBe('percent');
  });
});

describe('Map Fields to Triggers - Lower/Higher than', () => {
  const triggers = Object.values(state).map(mapFieldsToTrigger);

  test('priceType is rrp', () => {
    expect(triggers[2]?.priceType).toBe('rrp');
    expect(triggers[3]?.priceType).toBe('rrp');
  });

  test('Amount', () => {
    expect(triggers[2]?.value).toBe(null);
    expect(triggers[3]?.value).toBe(10);
  });

  test('Value Type', () => {
    expect(triggers[2]?.valueType).toBe(undefined);
    expect(triggers[3]?.valueType).toBe('percent');
  });
});

describe('Map Fields to Triggers - Any price change', () => {
  const triggers = Object.values(state).map(mapFieldsToTrigger);

  test('priceType is price', () => {
    expect(triggers[4]?.priceType).toBe('price');
  });

  test('Amount', () => {
    expect(triggers[4]?.value).toBe(100);
  });

  test('Value Type', () => {
    expect(triggers[4]?.valueType).toBe('amount');
  });

  test('Variation', () => {
    expect(triggers[4]?.variation).toBe('any');
  });
});

// Map Triggers to Fields

const triggers: TriggerType[] = [
  {
    value: 500,
    valueType: 'amount',
    priceType: 'price',
    variation: 'lte',
  },
  {
    value: 30,
    valueType: 'percent',
    priceType: 'price',
    variation: 'gte',
  },
  {
    value: null,
    valueType: 'amount',
    priceType: 'rrp',
    variation: 'lte',
  },
  {
    value: 10,
    valueType: 'percent',
    priceType: 'rrp',
    variation: 'gte',
  },
  {
    value: 100,
    valueType: 'amount',
    priceType: 'price',
    variation: 'any',
  },
];

describe('Map Triggers to Fields', () => {
  const parsedTriggers = triggers.map(mapTriggerToFields);

  // console.log(parsedTriggers, 'parsedTriggers');

  test('Price drops by', () => {
    expect(parsedTriggers[0]).toEqual({
      id: undefined,
      triggerValue: 500,
      trigger: { name: 'Price drops by', value: 'dropsBy' },
      triggerValueType: {
        name: 'amount',
        value: 'amount',
      },
    });
  });

  test('Price jumps by', () => {
    expect(parsedTriggers[1]).toEqual({
      triggerValue: 30,
      trigger: { name: 'Price jumps by', value: 'jumpsBy' },
      triggerValueType: {
        name: 'percent',
        value: 'percent',
      },
    });
  });

  test('Price jumps by', () => {
    expect(parsedTriggers[2]).toEqual({
      anyMetricChange: false,
      id: undefined,
      triggerValue: null,
      trigger: { name: 'Price lower than', value: 'lowerThan' },
      triggerPriceType: {
        name: 'RRP',
        value: 'rrp',
      },
      triggerValueType: undefined,
    });
  });

  test('Price drops by', () => {
    expect(parsedTriggers[3]).toEqual({
      anyMetricChange: true,
      id: undefined,
      triggerValue: 10,
      trigger: { name: 'Price higher than', value: 'higherThan' },
      triggerPriceType: {
        name: 'RRP',
        value: 'rrp',
      },
      triggerValueType: {
        name: 'percent',
        value: 'percent',
      },
    });
  });

  test('Any price change by', () => {
    expect(parsedTriggers[4]).toEqual({
      id: undefined,
      triggerValue: 100,
      trigger: { name: 'Any price change by', value: 'anyChange' },
      triggerValueType: {
        name: 'amount',
        value: 'amount',
      },
    });
  });
});
