import getCubeName from 'utils/getCubeName';

const Variants = getCubeName('Variants');

const keyMap = {
  [`${Variants}.url`]: 'url',
  [`${Variants}.price`]: 'price',
  [`${Variants}.regularprice`]: 'regularPrice',
  [`${Variants}.available`]: 'available',
  [`${Variants}.productname`]: 'productName',
  // [`${Variants}.brandname`]: 'brandName',
  [`${Variants}.retailername`]: 'retailer',
  [`${Variants}.rundate`]: 'rundate',
  [`${Variants}.retailerid`]: 'retailerid',
  [`${Variants}.productid`]: 'productid',
};

export const responseKeyMap = {
  ...keyMap,
  [`${Variants}.createdat.day`]: 'createdAt',
};

export default keyMap;
