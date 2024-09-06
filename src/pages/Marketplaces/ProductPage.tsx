import React, { useContext } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import { LocationTabs } from 'components/LocationTabs/LocationTabs';
import { ProductPageDetails } from './components/ProductDetails';
import { MarketplacePopup } from './components/Popup/MarketplacePopup';
import { PriceDrilldown } from './components/Tabs/PriceDrilldown';
import { Promotions } from './components/Tabs/Promotions';
import { useOffersQuery } from './hooks/useOffersQuery';
import { PriceHistory } from './components/Tabs/PriceHistory';
import MarketplaceContext from './MarketplaceContext';
import { useProductFromQuery } from './hooks/useProductFromQuery';
import { CeneoOfferRaw } from './ceneo/types';

type Props = {
  runTime?: string;
};

export const ProductPageContainer: React.FC<Props> = ({ runTime }) => {
  const { marketplace, clientName = '' } = useContext(MarketplaceContext);
  const { productId } = useParams<{ productId: string }>();
  const product = useProductFromQuery(
    marketplace,
    productId,
    runTime || '',
    clientName
  );
  const { offers, isOffersLoading } = useOffersQuery(
    marketplace,
    productId,
    runTime
  );
  return (
    <MarketplacePopup>
      <ProductPageDetails product={product} />
      <LocationTabs
        pages={[
          { name: 'price-drilldown' },
          { name: 'price-history' },
          { name: 'promotions', isDisabled: marketplace === 'idealo' },
        ]}
        mainPath={`/marketplaces/${marketplace}/product/${productId}`}
      />
      <Switch>
        <Route
          path={`/marketplaces/${marketplace}/product/:productId/price-drilldown`}
        >
          <PriceDrilldown
            offers={offers}
            clientPrice={product.clientPrice}
            isLoading={isOffersLoading}
          />
        </Route>
        <Route
          path={`/marketplaces/${marketplace}/product/:productId/price-history`}
        >
          <PriceHistory productId={productId} />
        </Route>
        <Route
          path={`/marketplaces/${marketplace}/product/:productId/promotions`}
        >
          <Promotions
            offers={offers.filter((offer) => (offer as CeneoOfferRaw)?.promo)}
            isLoading={isOffersLoading}
          />
        </Route>
      </Switch>
    </MarketplacePopup>
  );
};
