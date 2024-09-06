import {
  getAvailableCard,
  getCommonRecapCardsData,
  getPriceDropsCard,
  getPriceJumpsCard,
  getUnavailableCard,
} from 'components/Recaps/utils/getRecapCards/getNewRecapCards';
import { useCallback, useEffect, useState } from 'react';
import { RecapCardType } from 'components/Recaps/utils/types';
import { useSelector } from 'react-redux';

const useNewRecapCards = (
  regionCode: string | undefined
): { [key: string]: RecapCardType | null } => {
  const cubeAccessToken = useSelector(
    (state: RootState) => state.auth.cubeAccessToken
  );
  const intervals = useSelector(
    (state: RootState) => state.productAnalysis.intervals
  );
  const [jumps, setJumps] = useState<RecapCardType | null>(null);
  const [drops, setDrops] = useState<RecapCardType | null>(null);
  const [unavailable, setUnavailable] = useState<RecapCardType | null>(null);
  const [available, setAvailable] = useState<RecapCardType | null>(null);

  const fetchNewRecapCards = useCallback(async () => {
    if (cubeAccessToken && regionCode && intervals) {
      const { runs, lastRunVariantsCount: count } =
        await getCommonRecapCardsData(cubeAccessToken, regionCode, intervals);

      setJumps(
        await getPriceJumpsCard(cubeAccessToken, regionCode, runs, count)
      );
      setDrops(
        await getPriceDropsCard(cubeAccessToken, regionCode, runs, count)
      );
      setUnavailable(
        await getUnavailableCard(cubeAccessToken, regionCode, runs, count)
      );
      setAvailable(
        await getAvailableCard(cubeAccessToken, regionCode, runs, count)
      );
    }
  }, [cubeAccessToken, regionCode, intervals]);

  useEffect(() => {
    fetchNewRecapCards();
  }, [fetchNewRecapCards]);

  useEffect(() => {
    if (regionCode) {
      setJumps(null);
      setDrops(null);
      setUnavailable(null);
      setAvailable(null);
    }
  }, [regionCode]);

  return { jumps, drops, unavailable, available };
};

export default useNewRecapCards;
