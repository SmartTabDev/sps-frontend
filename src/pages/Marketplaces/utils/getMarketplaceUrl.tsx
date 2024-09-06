import { Marketplace } from 'reducers/auth/auth';

export const getMarketplaceUrl = (marketplace: Marketplace): string => {
  switch (marketplace) {
    case 'ceneo':
      return 'https://www.ceneo.pl/';
    case 'idealo':
      return 'https://www.idealo.de';
    default:
      throw new Error('Missing marketplace param');
  }
};
