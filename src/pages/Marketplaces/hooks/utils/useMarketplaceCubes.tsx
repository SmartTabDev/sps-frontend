import { useMemo } from 'react';
import { Marketplace } from 'reducers/auth/auth';
import getCubeName from 'utils/getCubeName';

export type MarketplaceCubes = {
  Products: string;
  Offers: string;
  Runs: string;
};

const useMarketplaceCubes = (marketplace?: Marketplace): MarketplaceCubes => {
  const cubes = useMemo(
    () => ({
      Offers: getCubeName('Offers', marketplace),
      Products: getCubeName('Products', marketplace),
      Runs: getCubeName('Runs', marketplace),
    }),
    [marketplace]
  );

  return cubes;
};

export default useMarketplaceCubes;
