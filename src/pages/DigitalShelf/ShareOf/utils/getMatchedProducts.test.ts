import { matchBrand } from './getMatchedProducts';

describe('matchBrand', () => {
  test('test passing regex as brand', () => {
    const noSpaProducts = [
      { name: 'new no-spa product' },
      { name: 'no-spa product' },
      { name: 'NO-SPA product' },
      { name: 'no-spa, product' },
    ];
    const products = [...noSpaProducts, { name: 'essentiale product' }];
    const result = matchBrand(['no-spa'], products);
    expect(result).toStrictEqual(noSpaProducts);
  });
});
