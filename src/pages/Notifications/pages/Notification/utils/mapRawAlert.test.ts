import { Alert } from 'types/Notification';
import mapRawAlert from './mapRawAlert';

const rawAlert: Alert = {
  id: 44,
  name: 'Test Notification',
  description: 'This is just a test for testing purpose',
  type: 'category',
  startDate: '',
  endDate: null,
  isActive: true,
  availableOnly: true,
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
  recipients: [
    {
      id: 39,
      email: 'mkemnitz@candy.pl',
    },
  ],
  categories: [
    {
      categoryId: 8,
    },
  ],
  retailers: [
    {
      retailerId: 1,
    },
    {
      retailerId: 26,
    },
    {
      retailerId: 25,
    },
    {
      retailerId: 24,
    },
  ],
  brands: [],
  variantLinks: [],
};

const finalAlert = {
  startDate: null, // TODO: moment
  endDate: null,
  name: 'Test Notification',
  description: 'This is just a test for testing purpose',
  emails: [
    {
      id: 39,
      email: 'mkemnitz@candy.pl',
    },
  ],
  isActive: true,
  availableOnly: true,
  sensitivity: 'specyfic',
  alertType: 'category',
  variantLinks: [],
  brands: [],
  categories: [
    8,
  ],
  retailers: [
    1,
    26,
    25,
    24,
  ],
};

describe('mapRawAlert', () => {
  test('test', () => {
    const alert = mapRawAlert(rawAlert);
    expect(alert).toStrictEqual(finalAlert);
  });
});
