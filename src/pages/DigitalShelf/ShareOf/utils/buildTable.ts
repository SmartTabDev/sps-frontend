import {
  ConfigCategory,
  ConfigKeyword,
  ConfigRetailer,
  ConfigSearchTerm,
} from 'types/AppConfig';
import { CategoryProduct } from 'types/CategoryProduct';
import { KeywordProduct } from 'types/KeywordProduct';
import { getPercentage } from 'utils/getPercentage';
import orderBy from 'lodash/orderBy';
import startCase from 'lodash/startCase';
import { getColor } from './getColor';
import { getMatchedProducts } from './getMatchedProducts';
import { Cell } from '../Search/types';
import filterCellProducts from './filterCellProducts';
import avg from './avg';
import { AVGitem } from '../Category/types';

type Title = 'Category' | 'Search term';

function isUpperCase(myString: string) {
  return myString === myString.toUpperCase();
}

const customSentenceCase = (str: string): string => {
  const words = str.split(' ');
  const newWords = words.map((word, index) => {
    if (isUpperCase(word)) {
      return word;
    }

    if (index > 0) {
      return word.toLowerCase();
    }

    return startCase(word);
  });

  return newWords.join(' ');
};

const buildTableHead = ({
  title,
  avg: avg2,
  retailers,
}: {
  title: Title;
  avg: number[];
  retailers: ConfigRetailer[];
}) => [
  { data: title },
  { data: 'Avg %' },
  ...retailers.map((r, index) => {
    const value = avg2[index];

    return {
      data: r.name,
      meta: {
        id: r.id,
        value,
        color: '#286DCB',
        type: 'retailer',
      },
    };
  }),
];

const buildTableBody = ({
  searchOfKey,
  products,
  config,
  searchTerms,
  retailers,
}: {
  searchOfKey:
    | keyof Pick<KeywordProduct, 'keywordid'>
    | keyof Pick<CategoryProduct, 'categoryid'>;
  products: KeywordProduct[] | CategoryProduct[];
  config: ConfigKeyword[] | ConfigCategory[];
  retailers: ConfigRetailer[];
  searchTerms: ConfigSearchTerm[];
}) => {
  return (config || []).map(({ name, id }) => {
    const cells = retailers.map((r) => {
      const filteredDetails = filterCellProducts({
        items: products,
        searchOfKey,
        searchOfValue: id,
        retailerId: r.id,
      });

      const matchedProducts = getMatchedProducts(searchTerms, filteredDetails);
      const percentage = getPercentage(
        matchedProducts.length || 0,
        filteredDetails.length || 1
      );

      let cellValue;
      if (filteredDetails.length === 0) {
        cellValue = undefined;
      } else {
        cellValue = percentage;
      }

      let position;
      if (matchedProducts.length > 0) {
        const orderedProducts = orderBy(matchedProducts, ['position'], ['asc']);
        const foundPosition = orderedProducts[0].position;

        if (foundPosition <= 3) {
          position = foundPosition;
        } else if (foundPosition > 3 && foundPosition <= 5) {
          position = 5;
        } else if (foundPosition >= 6 && foundPosition <= 10) {
          position = 10;
        }
      }

      return {
        data: '',
        meta: {
          value: cellValue,
          color: getColor(cellValue)?.color,
          background: getColor(cellValue)?.background,
          position,
          type: 'cell',
        },
      };
    });

    const cellsAvg = avg(cells.map((cell) => cell.meta.value || 0));

    const leftGrid = [
      { data: customSentenceCase(name), meta: { id } },
      {
        data: '',
        meta: {
          type: 'avg',
          value: cellsAvg,
          color: getColor(cellsAvg),
        },
      },
    ];
    return [...leftGrid, ...cells];
  });
};

const getColumnsAVG = (tableBody: Cell[][], retailers: ConfigRetailer[]) => {
  const rows = tableBody.map((row) => {
    const [, , ...cells] = row;

    return cells.map((cell) => cell?.meta?.value);
  });

  const columnAvg = retailers.map((r, index) => ({
    id: r.id,
    value: avg(rows.map((row) => row[index] || 0)),
  }));

  return columnAvg;
};

const getRowsAVG = (tableBody: Cell[][]) => {
  const rowsAvg = tableBody.map((row) => {
    const [item, _avg] = row;

    return {
      id: item?.meta?.id,
      value: _avg?.meta?.value,
    };
  });

  return rowsAvg;
};

export const buildTable = (
  retailers: ConfigRetailer[],
  config: ConfigKeyword[] | ConfigCategory[],
  products: KeywordProduct[] | CategoryProduct[],
  searchTerms: ConfigSearchTerm[],
  title: Title,
  searchOfKey:
    | keyof Pick<KeywordProduct, 'keywordid'>
    | keyof Pick<CategoryProduct, 'categoryid'>
): {
  table: Cell[][];
  columnsAvg: AVGitem[];
  rowsAvg: AVGitem[];
  avg: number;
} => {
  const tableBody = buildTableBody({
    products,
    searchTerms,
    retailers,
    config,
    searchOfKey,
  });

  const columnsAvg = getColumnsAVG(tableBody, retailers);
  const rowsAvg = getRowsAVG(tableBody);
  const totalAvg = avg(rowsAvg.map((row) => row.value));

  const tableHead = buildTableHead({
    title,
    avg: columnsAvg.map((avgItem) => avgItem.value),
    retailers,
  });

  const sortedTableBody = orderBy(tableBody, '0.data', 'asc');

  const result = {
    table: [tableHead, ...sortedTableBody],
    columnsAvg,
    rowsAvg,
    avg: totalAvg,
  };

  return result;
};
