import React from 'react';
import { Marketplace } from 'reducers/auth/auth';

type MarketplaceContextType = {
  marketplace: Marketplace | undefined;
  baseUrl: string | undefined;
  clientName: string | undefined;
};

const MarketplaceContext = React.createContext<MarketplaceContextType>({
  marketplace: undefined,
  baseUrl: undefined,
  clientName: undefined,
});

export const MarketplaceProvider = MarketplaceContext.Provider;

export default MarketplaceContext;
