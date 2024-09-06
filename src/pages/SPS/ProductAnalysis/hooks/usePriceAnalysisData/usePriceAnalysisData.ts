import { ConfigProduct } from 'types/AppConfig';
import { Row, TableView } from 'types/SPSTable';
import { useProductAnalysisInit } from '../useProductAnalysisInit';
import { useTableView } from '../useTableView';
import { usePriceAnalysisPrices } from './prices/usePriceAnalysisPrices';
import { usePriceAnalysisBaseData } from './baseData/usePriceAnalysisBaseData';
import { usePriceAnalysisFilters } from './filters/usePriceAnalysisFilters';
import { usePriceAnalysisListUtils } from './utils/usePriceAnalysisListUtils';
import { PriceAnalysisTimeframe } from '../../types';
import { PriceAnalysisFilters } from '../../components/ExpandedFilters/types';
import { BaseData } from './baseData/type';

interface Hook {
  list: Row[];
  isEmpty?: boolean;
  isSectionLoaded: ReturnType<typeof usePriceAnalysisPrices>['isSectionLoaded'];
  getOptionForView: ReturnType<typeof useTableView>['getOptionForView'];
  baseData?: BaseData;
  view: TableView;
}

export function usePriceAnalysisData(
  dateRange: PriceAnalysisTimeframe,
  expandedFilters: PriceAnalysisFilters,
  configProducts: ConfigProduct[],
  configId: number | undefined,
  regionCode: string | undefined
): Hook {
  // console.log('--- START usePriceAnalysisData ---');
  // console.time('usePriceAnalysisData');

  // view
  const { view, getOptionForView } = useTableView();

  // run init steps
  useProductAnalysisInit(configId);

  // prepare filters for table data
  const filters = usePriceAnalysisFilters(expandedFilters);

  // prepare base data, products list and runs list and columns batches
  const baseData = usePriceAnalysisBaseData(
    regionCode,
    configProducts,
    dateRange,
    filters
  );

  // load prices from cube and match them with products
  const {
    isSectionLoaded,
    dailyProductsWithPrices,
    hourlyProductsWithPrices,
    isEmpty,
  } = usePriceAnalysisPrices(regionCode, view, filters, baseData);

  // select correct list based on view, map data to list structure
  const { list } = usePriceAnalysisListUtils(
    view,
    hourlyProductsWithPrices,
    dailyProductsWithPrices,
    baseData,
    expandedFilters
  );

  // console.timeEnd('usePriceAnalysisData');
  // console.log('--- END usePriceAnalysisData ---');

  return {
    view,
    baseData,
    list,
    isEmpty,
    isSectionLoaded,
    getOptionForView,
  };
}
