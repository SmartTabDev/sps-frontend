export interface Run {
  price: number;
  regularPrice: number;
  available: boolean;
}

// { [CONFIG ID]: PRODUCT }
export type ProductsStructure = Record<number, Product>;

export interface Product {
  productname: string; // CONFIG PRODUCT NAME
  productid: number; // VARIANT PRODUCT ID
  retailers: {
    retailerid: string;
    retailername: string;
    url?: string;
    productname?: string | null;
    runs: Record<string, Run | null>;
    runsFormatted: Record<string, string>;
  }[];
}

export interface BaseData {
  products: Record<string, Product>;
  productsOrder: number[]; // config product id array
  runs: {
    Daily: string[];
    Hourly: string[];
  };
  runsBatches: {
    Daily: [string, string][];
    Hourly: [string, string][];
  };
}
