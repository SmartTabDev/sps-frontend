import mapKeys from 'lodash/mapKeys';

const getDimensionKeys = (obj: any): any =>
  mapKeys(obj, (_value, key) => key.split('.')[1]);

export default getDimensionKeys;
