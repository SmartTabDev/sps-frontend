import { ConfigRetailer } from 'types/AppConfig';
import { Product } from 'types/Product';

const getRetailerName = (retailers: ConfigRetailer[], product: Product): string => {
  const retailer = retailers.find(({ id }) => id === product.retailerid);
  return retailer ? retailer.name : '';
};

export default getRetailerName;
