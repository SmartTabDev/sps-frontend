type CubeVariant<T> = {
  [K in keyof T as `$VariantFull.${K & string}`]: T[K];
};

// TODO: split to KPI Variant and SPS Variant
export type Product = {
  price: string;
  available: boolean;
  brandname: string;
  brandid: number;
  ispageavailable: boolean;
  url: string;
  productname: string;
  retailername: string;
  retailerid: number;
  currencyiso: string;
  countryiso: string;
  categoryname: string;
  categoryid: number;
  createdat: string | null;
  rundate: string | null;
  reviewcount: number;
  clients: number;
  variantlinkid: number;
  productid: number;
  roundrating: number;
  rating: number;
};

export type Variant = Product;

export type VariantFull = CubeVariant<Variant>
