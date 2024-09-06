import { sortBy } from 'lodash';
import { getUniqueValues } from 'utils/getUniqueValues';

export const getUniqueNames = (data: string[]): string[] => {
  const uniqueNames = getUniqueValues(data);
  return sortBy(uniqueNames);
};
