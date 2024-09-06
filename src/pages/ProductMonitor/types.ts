export type ProductMonitorCellData =
  | undefined
  | null
  | string
  | {
      url?: string;
      price: string;
      change: 'higher' | 'lower' | null;
      available?: 1 | 0;
    };

export type ProductMonitorList = ProductMonitorCellData[][];

export interface ProductMonitorCategory {
  id: string;
  name: string;
  parent: ProductMonitorCategory;
}

export interface ProductMonitorRun {
  id: string;
  createdAt: string;
}

export interface ProductMonitorRetailer {
  id: number;
  name: string;
}

export interface ProductMonitorPriceRange {
  minPrice: number;
  maxPrice: number;
}

export interface ProductMonitorProductFeature {
  id: number;
  value: string;
  productId: string;
}
export interface ProductMonitorFeature {
  id: number;
  name: string;
  values: ProductMonitorProductFeature[];
}

export type ProductMonitorFilters = {
  category: ProductMonitorCategory | undefined;
  retailers: ProductMonitorRetailer[] | undefined;
  brands: string[];
  priceRange: ProductMonitorPriceRange | undefined;
  features: ProductMonitorFeature[] | undefined;
  products: string[];
  search: string;
};

export type ProductStructure = Record<string, number>;
