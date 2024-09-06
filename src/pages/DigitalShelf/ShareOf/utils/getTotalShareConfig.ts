import sortBy from 'lodash/sortBy';
import { ConfigCategory, ConfigKeyword, ConfigRetailer } from 'types/AppConfig';
import { formatPercentage } from 'utils/formatPercentage';
import { AVGData } from '../Category/types';

export const getTotalShareConfig = (
  avgData: AVGData,
  x: ConfigRetailer[],
  y: ConfigCategory[] | ConfigKeyword[],
  yTitle: string,
) => {
  const xItems = sortBy(avgData.columnsAvg, 'value').map(({ id, value }) => ({
    name: x.find((xItem) => xItem.id === id)?.name || '',
    value: formatPercentage(value),
  }));

  const yItems = sortBy(avgData.rowsAvg, 'value').map(({ id, value }) => ({
    name: y.find((yItem) => yItem.id === id)?.name || '',
    value: formatPercentage(value),
  }));

  const result = [
    {
      title: `Best ${yTitle}`,
      values: [...yItems].reverse().splice(0, 3),
    },
    {
      title: 'Best Retailers',
      values: [...xItems].reverse().splice(0, 3),
    },
    {
      title: 'Worst Retailers',
      values: [...xItems].splice(0, 3),
    },
  ];

  return result;
};
