import { MarketplaceOffer } from '../types';
import { matchMarketplaceRecord } from './matchMarketplaceRecord';

const emptyResult = { price: undefined };

export const getClientOffer = (
  retailer: string | undefined,
  offers: (MarketplaceOffer | undefined)[],
): Partial<MarketplaceOffer> => {
  if (retailer && offers.length) {
    const matchOffer = matchMarketplaceRecord<MarketplaceOffer>('retailer', retailer);
    const clientOffer = offers.find(matchOffer);

    if (clientOffer) {
      return clientOffer;
    }
  }

  return emptyResult;
};
