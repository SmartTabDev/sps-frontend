export type Config = { domainName?: string };
export type ConfigBrand = { name: string; id: number };
export type ConfigCategory = { name: string; id: number };
export type ConfigRetailer = { name: string; url: string; id: number };
export type ConfigKeyword = { name: string; id: number };
export type ConfigSearchTerm = { name: string; id: number };

export type ConfigLink = {
  id: number;
  product: number;
  retailer: number;
  url: string;
};

export type ConfigProduct = {
  id: number;
  name: string;
  handsetName: string;
  category: number | null;
  brand: number | null;
  createdAt: string;
};

export type ConfigFlatProduct = ConfigProduct & {
  retailer: ConfigRetailer;
};

export type ConfigFilter =
  | ConfigBrand
  | ConfigCategory
  | ConfigProduct
  | ConfigRetailer;

export type ProductLink = {
  id: number;
  product: ConfigProduct | null;
  retailer: ConfigRetailer | null;
  category: ConfigCategory | null;
  brand: ConfigBrand | null;
  url: string;
};

export type SPSConfig = {
  products: ConfigProduct[];
  brands: ConfigBrand[];
  categories: ConfigCategory[];
  retailers: ConfigRetailer[];
  links: ConfigLink[];
  linksMap: { [key: string]: number };
  namesMap: { [key: string]: string };
  rrpMap: { [key: string]: string };
};

export type SPSConfigFilters = Omit<SPSConfig, 'customer'>;

export type KPIConfig = {
  products: ConfigProduct[];
  brands: ConfigBrand[];
  categories: ConfigCategory[];
  retailers: ConfigRetailer[];
  links: ConfigLink[];
  categoryLinks?: {
    id: number;
    url: string;
    retailer: ConfigRetailer;
    category: ConfigCategory;
  }[];
  keywords?: ConfigKeyword[];
  categoryLinksCategories?: ConfigCategory[];
  searchTerms?: ConfigSearchTerm[];
  categoryRetailers: ConfigRetailer[];
  searchRetailers: ConfigRetailer[];
  productRetailers: ConfigRetailer[];
  keywordLinks: {
    id: number;
    url: string;
    retailer: ConfigRetailer;
    category: ConfigCategory;
  }[];
};

type ConfigMarketplaceProduct = {
  id: number;
  brand: ConfigBrand;
  name: string;
  ean: string | null;
  links: string[];
  createdAt: string;
};

type ConfigMarketplaceCustomer = {
  siteUrl: string;
};

export type MarketplaceConfig = {
  products: ConfigMarketplaceProduct[];
  customer: ConfigMarketplaceCustomer;
};

export type AppConfig = SPSConfig | KPIConfig | MarketplaceConfig;
