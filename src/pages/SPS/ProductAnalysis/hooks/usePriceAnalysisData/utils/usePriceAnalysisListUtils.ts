import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Row, TableView } from 'types/SPSTable';
import { PriceAnalysisFilters } from 'pages/SPS/ProductAnalysis/components/ExpandedFilters/types';
import { mapProductsStructureToList } from './mappers';
import { BaseData, ProductsStructure } from '../baseData/type';

interface Hook {
  list: Row[];
  activeViewProducts: ProductsStructure | undefined;
}

function buildSkeletonRows(x: number, fill: any = undefined): undefined[] {
  return Array.from(Array(x)).fill(fill);
}

function buildSkeletonList(x: number, y: number): undefined[][] {
  return Array.from(Array(y)).map(() => buildSkeletonRows(x));
}

const bigSkeletons = buildSkeletonList(30, 30);

export function usePriceAnalysisListUtils(
  view: TableView,
  hourlyProductsWithPrices?: ProductsStructure,
  dailyProductsWithPrices?: ProductsStructure,
  baseData?: BaseData,
  filters?: PriceAnalysisFilters
): Hook {
  const namesMap = useSelector((state) => state.config.sps.namesMap);

  const listHourly = useMemo(() => {
    if (baseData && hourlyProductsWithPrices) {
      return mapProductsStructureToList(
        baseData.productsOrder,
        baseData.runs.Hourly,
        hourlyProductsWithPrices,
        'date-hour',
        namesMap,
        filters
      );
    }
    return bigSkeletons;
  }, [baseData, hourlyProductsWithPrices, filters, namesMap]);

  const listDaily = useMemo(() => {
    if (baseData && dailyProductsWithPrices) {
      return mapProductsStructureToList(
        baseData.productsOrder,
        baseData.runs.Daily,
        dailyProductsWithPrices,
        'date',
        namesMap,
        filters
      );
    }
    return bigSkeletons;
  }, [baseData, dailyProductsWithPrices, filters, namesMap]);

  const activeViewList = view === 'Daily' ? listDaily : listHourly;
  const activeViewProducts =
    view === 'Daily' ? dailyProductsWithPrices : hourlyProductsWithPrices;

  const list = useMemo(() => {
    return [
      ...activeViewList,
      // additional row
      //   buildSkeletonRows(
      //     activeViewList && activeViewList.length
      //       ? (activeViewList[0] || []).length
      //       : 0,
      //     {}
      //   ),
    ];
  }, [activeViewList]);

  return {
    list,
    activeViewProducts,
  };
}
