import { ConfigProduct } from 'types/AppConfig';
import devLog from 'utils/devLog';
import { ProductsStructure } from './type';

export function mapRawProductsDataToProductsStructure(
  data: any[],
  configProducts: ConfigProduct[] | undefined
): ProductsStructure {
  const productsStructure: ProductsStructure = {};
  const ignoredProducts: any[] = [];

  data.forEach((row) => {
    const productname = configProducts
      ? configProducts.find((p) => p.id === row.productid)?.name || ''
      : '';
    const productId = configProducts
      ? configProducts.find((p) => p.id === row.productid)?.id || 0
      : 0;
    const product = productsStructure[productId];
    const retailer =
      product &&
      product.retailers.find((r) => r.retailername === row.retailername);

    if (!product && !retailer) {
      productsStructure[productId] = {
        productid: row.productid,
        productname,
        retailers: [
          {
            retailerid: row.retailerid,
            retailername: row.retailername,
            url: undefined,
            runs: {},
            runsFormatted: {},
          },
        ],
      };
    } else if (product && !retailer) {
      product.retailers.push({
        retailerid: row.retailerid,
        retailername: row.retailername,
        url: undefined,
        runs: {},
        runsFormatted: {},
      });
    } else {
      ignoredProducts.push({
        product: { ...product, retailers: [retailer] },
        variant: row,
      });
    }
  });

  devLog(ignoredProducts, 'ignoredProducts');

  return productsStructure;
}

export function createDateBatches(
  runs: string[],
  batchSize: number
): [string, string][] {
  const reversedRuns = [...runs].reverse();
  const dateRanges = reversedRuns.reduce((acc, val, index) => {
    if (index % batchSize === 0) {
      // every n (batchSize)
      acc.push([
        reversedRuns[index + batchSize] ||
          reversedRuns[reversedRuns.length - 1]!,
        val,
      ]);
    }
    return acc;
  }, [] as [string, string][]);

  return dateRanges;
}
