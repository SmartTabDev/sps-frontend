import { ProductLink } from 'types/AppConfig';
import alasql from 'alasql';

const filterProductLinks = (
  links: ProductLink[],
  retailers: number[] = [],
  categories: number[] = [],
  brands: number[] = [],
): ProductLink[] => {
  if ([...retailers, ...categories, ...brands].length === 0) return [];

  const retailerIds = retailers.join(',');
  const categoryIds = categories.join(',');
  const brandIds = brands.join(',');

  const whereQuery = [
    retailers.length > 0 ? `retailer->id IN (${retailerIds})` : '',
    categories.length > 0 ? `category->id IN (${categoryIds})` : '',
    brands.length > 0 ? `brand->id IN (${brandIds})` : '',
  ];

  const filteredWhereQuery = whereQuery.filter((value) => value !== '');

  const joinedWhereQuery = filteredWhereQuery.join(' AND ');

  const query = `SELECT * FROM ? WHERE ${joinedWhereQuery}`;

  const data = alasql(query, [links]);

  return data;
};

export default filterProductLinks;
