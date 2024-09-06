import { ConfigBrand, ConfigCategory, ConfigRetailer } from 'types/AppConfig';
import { PriceAnalysisTimeframe, PriceAnalysisPriceRange } from '../../types';

type priceChangeFilter = 'All' | 'Drops' | 'Jumps';
type availabilityFilter = 'All' | 'Available' | 'Unavailable';

export type PriceAnalysisFilters = {
    availability: {
      name: availabilityFilter;
    }[];
    priceChange: {
      name: priceChangeFilter;
    }[];
    timeframe: PriceAnalysisTimeframe;
    priceRange: PriceAnalysisPriceRange;
    selectedBrands: ConfigBrand[];
    selectedCategories: ConfigCategory[];
    selectedRetailers: ConfigRetailer[];
  };
