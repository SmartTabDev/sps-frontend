import { PriceCell, Row, TableView } from 'types/SPSTable';
import getRecapCards from 'components/Recaps/utils/getRecapCards/getRecapCards';
import getNewRecapCards from 'components/Recaps/utils/getRecapCards/getNewRecapCards';
import flatten from 'lodash/flatten';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Variant } from 'types/Product';
import { RecapCardType } from 'components/Recaps/utils/types';
import { useSelector } from 'react-redux';
import { BaseData } from '../usePriceAnalysisData/baseData/type';

const mapListToVariants = (list: Row[]): Partial<Variant>[] => {
  const pricesRows = [...list].slice(1);

  const variants = flatten(
    pricesRows.map((row) => {
      const [product, retailer, ...prices] = row;

      return prices
        .filter(
          (item): item is PriceCell =>
            item !== undefined && item.kind === 'price'
        )
        .map((priceCell) => ({
          productname: String(product?.data),
          retailername: String(retailer?.data),
          price: priceCell.meta.originalPrice,
          available: priceCell.meta.available || undefined,
          rundate: priceCell.meta.originalDate,
        }));
    })
  );

  return variants;
};

const useRecapCards = (
  view: TableView,
  baseData: BaseData | undefined,
  list: Row[],
  regionCode: string | undefined
): { cards: RecapCardType[]; oldCards: RecapCardType[] } => {
  const cubeAccessToken = useSelector(
    (state: RootState) => state.auth.cubeAccessToken
  );
  const intervals = useSelector(
    (state: RootState) => state.productAnalysis.intervals
  );
  const [cards, setCards] = useState<RecapCardType[]>([]);
  const [oldCards, setOldCards] = useState<RecapCardType[]>([]);
  const {
    runs: { Daily, Hourly },
  } = baseData || { runs: {} };

  const activeRuns = useMemo(
    () => (view === 'Daily' ? Daily : Hourly),
    [Daily, Hourly, view]
  );

  const variants = useMemo(() => {
    const v = mapListToVariants(list);
    return v;
  }, [list]);

  const fetchNewRecapCards = useCallback(async () => {
    if (cubeAccessToken && regionCode && intervals) {
      const currentCards = await getNewRecapCards(
        cubeAccessToken,
        regionCode,
        intervals
      );
      setCards(currentCards);
    }
  }, [cubeAccessToken, regionCode, intervals]);

  useEffect(() => {
    fetchNewRecapCards();
  }, [fetchNewRecapCards]);

  useEffect(() => {
    if (activeRuns && activeRuns.length && variants.length && regionCode) {
      const currentCards = getRecapCards(activeRuns, variants);
      setOldCards(currentCards);
    }
  }, [activeRuns, variants, regionCode]);

  useEffect(() => {
    if (regionCode) {
      setCards([]);
    }
  }, [regionCode]);

  return { cards, oldCards };
};

export default useRecapCards;
