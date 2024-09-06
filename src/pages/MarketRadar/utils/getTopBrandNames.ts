import { getUniqueValues } from 'utils/getUniqueValues';

/**
 * Returns the top brand names based on their values. If there are duplicates, it will exceed limit to include all of them.
 * @param {[string, number][]} brandData - An array of tuples containing a string and a number representing the name and value respectively for each brand.
 * @param {number} limit - The maximum amount of brands that should be returned in an array.
 */
export function getTopBrandNames(
  brandData: [string, number][],
  limit: number
): string[] {
  const topBrands = brandData
    .map((brand) => ({
      name: brand[0],
      value: brand[1],
    }))
    .sort((a, b) => b.value - a.value);

  const uniqueValues = getUniqueValues<
    {
      name: string;
      value: number;
    },
    'value'
  >(topBrands, 'value');

  let topValues = uniqueValues;

  if (uniqueValues.length > limit) {
    topValues = uniqueValues.slice(0, limit);
  }

  return topBrands
    .filter((brand) => brand.value >= topValues[topValues.length - 1]!)
    .map((brand) => brand.name);
}
