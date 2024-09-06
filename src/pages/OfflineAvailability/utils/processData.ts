import getCubeName from 'utils/getCubeName';
import { OAMItem } from '../types/Chart';

const Products = getCubeName('Products', 'oam_aggregations');

export function processData(rawData: any[]): OAMItem[] {
  return rawData.map((item) => ({
    retailer: item?.[`${Products}.retailer`],
    category: item?.[`${Products}.category`],
    subcategory: item?.[`${Products}.subcategory`],
    shop_class: item?.[`${Products}.shop_class`],
    product_class: item?.[`${Products}.product_class`],
    value: item?.[`${Products}.availability_sum`]
      ? Number(item?.[`${Products}.availability_sum`])
      : 0,
    date: item?.[`${Products}.date`],
  }));
}
