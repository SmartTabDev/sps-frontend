import { Product } from 'types/Product';
import { Row, TableView } from 'types/SPSTable';
import { ProductComparisonView } from 'reducers/productComparison/productComparison';
import sortBy from 'lodash/sortBy';
import hoursProcessing from './hours/index';
import daysProcessing from './day/index';
import processData from './processData';
import { buildTableHead } from './utils/buildTableHead';

const processing = {
  Daily: daysProcessing,
  Hourly: hoursProcessing,
};

const toLower = (str: string): string => str.toLowerCase();

const filterProduct = (array: Row[], filter: string): Row[] =>
  array.filter(([productName]: any) =>
    toLower(String(productName.data)).includes(toLower(filter))
  ); // eslint-disable-line max-len

const buildSPSTable = ({
  data,
  view,
  filter,
  dates,
  showBy = 'Product',
}: {
  data: Product[];
  view?: TableView;
  filter?: string;
  dates: string[];
  showBy?: ProductComparisonView;
}): Row[] => {
  if (view && showBy) {
    const tableHead = buildTableHead(view, dates, showBy);

    const [, , ...datesRow] = tableHead;

    let groupingKeys;
    let dataToProcess = data;

    if (showBy === 'Retailer') {
      groupingKeys = ['retailername', 'productname'];
      dataToProcess = sortBy(data, 'retailername');
    } else {
      groupingKeys = ['productname', 'retailername'];
      dataToProcess = sortBy(data, 'productname');
    }

    const groupedData = processing[view](
      processData(dataToProcess),
      datesRow,
      groupingKeys
    );

    let finalData = groupedData;

    if (filter) {
      finalData = filterProduct(groupedData, filter);
    }
    const result = [tableHead, ...finalData];

    return result;
  }

  return [];
};

export { buildSPSTable };
