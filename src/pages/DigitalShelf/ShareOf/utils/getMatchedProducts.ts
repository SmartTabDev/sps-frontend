import { ConfigSearchTerm } from 'types/AppConfig';
import { CategoryProduct } from 'types/CategoryProduct';
import { KeywordProduct } from 'types/KeywordProduct';

export const matchBrand = (keys: string[], products: any[] = []): any[] => {
  const arr = products.filter((product) => keys.find((key) => {
    const regex = new RegExp(`\\s${key}[^\\w\\s]?\\s`, 'gi');
    const result = regex.test(` ${product.name}`);
    return result;
  }));

  return arr;
};

export const getMatchedProducts = (
  searchTerms: ConfigSearchTerm[],
  products: CategoryProduct[] | KeywordProduct[],
): any[] => {
  const items = searchTerms.map((item) => item.name);
  const matchedProducts = matchBrand(items, products);

  return matchedProducts;
};
