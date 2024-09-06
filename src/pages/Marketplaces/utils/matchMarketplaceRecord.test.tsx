import { matchMarketplaceRecord } from './matchMarketplaceRecord';

const offers = [
  {
    productName: undefined,
  },
  {
    productName: 'ceneo product 1',
  },
  {
    productName: 'ceneo product 2',
  },
];

const ceneoProduct = {
  productName: 'ceneo product 1',
};

it('default case', () => {
  const matchProduct = matchMarketplaceRecord<Partial<typeof ceneoProduct>>(
    'productName',
    ceneoProduct.productName,
  );

  const product = offers.find(matchProduct);
  expect(product).toStrictEqual(ceneoProduct);
  expect(product?.productName).toBe('ceneo product 1');
});
