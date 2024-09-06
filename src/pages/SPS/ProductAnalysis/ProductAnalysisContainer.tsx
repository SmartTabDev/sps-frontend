import React, { useContext } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { styled } from '@mui/system';
import Container from '@mui/material/Container';
import RecapContainer from 'components/Recaps/RecapContainer';
import NoData from 'components/NoData';
import { ConfigProduct } from 'types/AppConfig';
import { ConfigContext } from 'contexts/ConfigContext';
import RecapCardList from 'components/Recaps/RecapCardList';
import PriceAnalysisRecapCard from 'components/Recaps/PriceAnalysisRecapCard';
import { useCardWidth } from 'components/Recaps/hooks/useCardWidth';
import { RecapWrapper } from 'components/Recaps/RecapWrapper';
import ProductModal from '../components/Modal';
import { ProductAnalysisTableCached } from './components/Table/ProductAnalysisTableCached';
import { PriceAnalysisFilters } from './components/ExpandedFilters/types';
import { PriceAnalysisTimeframe } from './types';
import { usePriceAnalysisData } from './hooks/usePriceAnalysisData/usePriceAnalysisData';
import useNewRecapCards from './hooks/recaps/useNewRecapCards';

const StyledRecapWrapper = styled(RecapWrapper)`
  width: calc(100% - 2 * 24px);
`;

const SyledContainer = styled(Container)`
  position: relative;
  height: calc(100vh - 184px);
  display: flex;
  flex-direction: column;

  ::-webkit-scrollbar {
    display: none;
  }
`;

type Props = {
  configProducts: ConfigProduct[];
  dateRange: PriceAnalysisTimeframe;
  filters: PriceAnalysisFilters;
  isDense: boolean;
  isIndex: boolean;
  recaps: boolean;
};

const ProductAnalysisContainer: React.FC<Props> = ({
  configProducts,
  dateRange,
  filters,
  isDense,
  isIndex,
  recaps,
}) => {
  const { configId, regionCode } = useContext(ConfigContext);
  const history = useHistory();
  const { list, isEmpty, isSectionLoaded, getOptionForView } =
    usePriceAnalysisData(
      dateRange,
      filters,
      configProducts,
      configId,
      regionCode
    );
  const { jumps, drops, available, unavailable } = useNewRecapCards(regionCode);

  const handleOpen = (productid: number) => {
    if (productid) {
      history.push(
        `/price-analysis/price-performance/${productid}/price-drilldown`
      );
    }
  };

  const handleClose = () => {
    history.push('/price-analysis/price-performance');
  };

  const cards = [jumps, drops, unavailable, available];
  const cardCount = useCardWidth(cards.length);

  return (
    <>
      <SyledContainer disableGutters maxWidth={false}>
        {recaps && (
          <RecapContainer
            isLoaded={Boolean(cards.length)}
            cardCount={cardCount}
            Panel={StyledRecapWrapper}
          >
            <RecapCardList cards={cards} Card={PriceAnalysisRecapCard} />
          </RecapContainer>
        )}
        {isEmpty === true ? (
          <NoData show />
        ) : (
          <ProductAnalysisTableCached
            list={list}
            handleOpenModal={handleOpen}
            isSectionLoaded={isSectionLoaded}
            productNameLink
            isDense={isDense}
            isIndex={isIndex}
            key={String(isDense)}
          />
        )}
      </SyledContainer>
      <Route
        path="/price-analysis/price-performance/:productId/price-drilldown"
        exact
      >
        <ProductModal
          getOptionForView={getOptionForView}
          handleClose={handleClose}
          open
          dateRange={dateRange?.join('~') || ''}
        />
      </Route>
    </>
  );
};

export default ProductAnalysisContainer;
