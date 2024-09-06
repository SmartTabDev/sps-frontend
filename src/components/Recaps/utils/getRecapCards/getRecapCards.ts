import * as math from 'mathjs';
import { compare } from 'mathjs';
import { getPercentage } from 'utils/getPercentage';
import merge from 'lodash/merge';
import sumBy from 'lodash/sumBy';
import map from 'lodash/map';
import takeRight from 'lodash/takeRight';
import zip from 'lodash/zip';
import values from 'lodash/values';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import keyBy from 'lodash/keyBy';
import keys from 'lodash/keys';
import last from 'lodash/last';
import { RecapCardType } from '../types';

type Cards = { [key: string]: RecapCardType };

const defaultCards: Cards = {
  'Price jumps': {
    name: 'Price jumps',
    color: '#28A745',
    positive: true,
  },
  'Price drops': {
    name: 'Price drops',
    color: '#F00F00',
    positive: false,
  },
  Unavailable: {
    name: 'Unavailable',
    color: '#828282',
    positive: false,
  },
  Available: {
    name: 'Available',
    color: undefined,
    positive: false,
  },
};

const createCard = (
  cards: Cards,
  cardName: RecapCardType['name'],
  data: Partial<RecapCardType>
): RecapCardType => {
  const cardDefault = cards[cardName];
  const card = merge({}, cardDefault, data);

  return card;
};

const getStatsForRun = (groupedVariants: any, run: any): any => {
  const currentVariants = groupedVariants[run];

  if (currentVariants) {
    const available = sumBy(currentVariants, (variant: any) =>
      variant.available ? 1 : 0
    );
    const unavailable = sumBy(currentVariants, (variant: any) =>
      variant.available ? 0 : 1
    );
    const prices = map(currentVariants, (variant: any) => {
      if (!variant.price) {
        return -1;
      }
      return Number(variant.price.replace(',', '.'));
    });

    return {
      run,
      available,
      unavailable,
      prices,
      all: currentVariants.length,
    };
  }

  return null;
};

type DataForCards = {
  all: number;
  run: string[];
  available: number[];
  unavailable: number[];
  priceJumps: number[];
  priceDrops: number[];
};

const formatCard = (
  dataForCards: DataForCards,
  key: keyof Omit<DataForCards, 'all' | 'run'>
) => {
  const currentValues = dataForCards[key];

  return {
    value: last(currentValues),
    subtitle: Number(
      getPercentage(last(currentValues), dataForCards.all).toFixed(2)
    ),
    series: [
      {
        name: '',
        data: currentValues,
      },
    ],
  };
};

const getRecapCards = (_runs: string[], _variants: any[]): any[] => {
  const groupedVariants = groupBy(_variants, 'rundate');
  const orderedRuns = orderBy(keys(groupedVariants), 'run');
  const dates = takeRight(orderedRuns, 8); // we need 7 days, one more for compare
  const stats = dates.map((run) => getStatsForRun(groupedVariants, run));
  const prices = map(stats, (stat) => stat.prices);
  const zipped = zip<number>(...prices) as any as number[][];

  const comparedPrices = zipped.map((row) =>
    row.map((price, index, collection) => {
      const prevPrice = collection[index - 1];

      // comented code turns off counting no-price to price
      if (!prevPrice) {
        // prevPrice === -1 ||
        return 0;
      }

      if (price === -1 || !price) {
        return 0;
      }

      return Number(compare(price, prevPrice));
    })
  );

  const matrix = math.matrix(comparedPrices);
  const transposedMatrix = math.transpose(matrix);

  const priceChanges = (transposedMatrix.toArray() as number[][]).map(
    (row, index) => {
      const priceJumps = sumBy(row, (value) => (value === 1 ? 1 : 0));
      const priceDrops = sumBy(row, (value) => (value === -1 ? 1 : 0));

      return {
        run: dates[index],
        priceJumps,
        priceDrops,
      };
    }
  );

  const merged = merge(keyBy(stats, 'run'), keyBy(priceChanges, 'run'));
  const currentValues = values(merged);

  //   if (currentValues.length === 0) {
  //     throw new Error('no values');
  //   }

  const dataForCards = {
    all: last(currentValues).all,
    run: map(currentValues, (run) => run.run),
    available: map(currentValues, (run) => run.available),
    unavailable: map(currentValues, (run) => run.unavailable),
    priceJumps: map(currentValues, (run) => run.priceJumps),
    priceDrops: map(currentValues, (run) => run.priceDrops),
  };

  const priceJumps = formatCard(dataForCards, 'priceJumps');
  const priceDrops = formatCard(dataForCards, 'priceDrops');
  const unavailable = formatCard(dataForCards, 'unavailable');
  const available = formatCard(dataForCards, 'available');

  const result = [
    createCard(defaultCards, 'Price jumps' as const, priceJumps),
    createCard(defaultCards, 'Price drops' as const, priceDrops),
    createCard(defaultCards, 'Unavailable' as const, unavailable),
    createCard(defaultCards, 'Available' as const, available),
  ];

  return result;
};

export default getRecapCards;
