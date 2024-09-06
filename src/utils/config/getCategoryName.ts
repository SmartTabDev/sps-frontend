import { ConfigCategory } from 'types/AppConfig';
import { Product } from 'types/Product';

const getCategoryName = (categories: ConfigCategory[], product: Product): string => {
  const category = categories.find(({ id }) => id === product.categoryid);
  return category ? category.name : '';
};

export default getCategoryName;
