import toUpper from 'lodash/toUpper';

const filterNames = (name: string | number, searchKey: string): boolean =>
  toUpper(String(name)).includes(toUpper(searchKey));

export default filterNames;
