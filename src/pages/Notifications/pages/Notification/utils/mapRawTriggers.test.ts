import { Alert } from 'types/Notification';
import mapRawTriggers from './mapRawTriggers';

const rawAlert: Partial<Alert> = {
  triggers: [
    {
      id: 19,
      priceType: 'price',
      value: 10,
      valueType: 'amount',
      variation: 'gte',
    },
    {
      id: 20,
      priceType: 'price',
      value: 20,
      valueType: 'amount',
      variation: 'gte',
    },
    {
      id: 21,
      priceType: 'price',
      value: 30,
      valueType: 'percent',
      variation: 'lte',
    },
  ],
};

const finalTriggers = {
  19: {
    trigger: {
      name: 'Price jumps by',
      value: 'jumpsBy',
    },
    triggerValue: 10,
    triggerValueType: {
      name: 'amount',
      value: 'amount',
    },
    id: 19,
  },
  20: {
    trigger: {
      name: 'Price jumps by',
      value: 'jumpsBy',
    },
    triggerValue: 20,
    triggerValueType: {
      name: 'amount',
      value: 'amount',
    },
    id: 20,
  },
  21: {
    trigger: {
      name: 'Price drops by',
      value: 'dropsBy',
    },
    triggerValue: 30,
    triggerValueType: {
      name: 'percent',
      value: 'percent',
    },
    id: 21,
  },
};

describe('mapRawTriggers', () => {
  test('test', () => {
    const triggers = mapRawTriggers(rawAlert);
    expect(triggers).toStrictEqual(finalTriggers);
  });
});
