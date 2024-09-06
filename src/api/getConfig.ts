import { configApi } from 'api';
import { Marketplace, Service } from 'reducers/auth/auth';
import {
  KPIConfig,
  SPSConfig,
  MarketplaceConfig,
  ConfigProduct,
} from 'types/AppConfig';
import uniqBy from 'lodash/uniqBy';
import fromPairs from 'lodash/fromPairs';
import orderByName from 'utils/orderByName';
import filterNames from 'utils/config/filterNames';
import { AxiosRequestConfig, Method } from 'axios';
import { getDayStartDate } from 'utils/dates/moment/getTimeframe';

const req = async (
  configAccessToken: string,
  type: string,
  service: Service,
  params?: AxiosRequestConfig['params']
) => {
  const options = {
    method: 'get' as Method,
    url: `/${service}/${type}`,
    headers: {
      accesstoken: configAccessToken,
    },
    ...(params ? { params } : {}),
  };

  return (await configApi(options)).data;
};

export const getKPIConfig = async (
  configAccessToken: string,
  configId: number | undefined
): Promise<KPIConfig> => {
  const [
    brands,
    categories,
    categoryLinks,
    products,
    retailers,
    links,
    keywords,
    keywordLinks,
    searchTerms,
    productRetailers,
    categoryRetailers,
    searchRetailers,
  ] = await Promise.all([
    req(configAccessToken, `config/${configId}/brands`, 'kpi'),
    req(configAccessToken, `config/${configId}/categories`, 'kpi'),
    req(configAccessToken, `config/${configId}/category-links`, 'kpi'),
    req(configAccessToken, `config/${configId}/products`, 'kpi'),
    req(configAccessToken, `config/${configId}/retailers`, 'kpi'),
    req(configAccessToken, `config/${configId}/links`, 'kpi'),
    req(configAccessToken, `config/${configId}/keywords`, 'kpi'),
    req(configAccessToken, `config/${configId}/keywords/links`, 'kpi'),
    req(configAccessToken, `config/${configId}/customer/search-terms`, 'kpi'),
    req(configAccessToken, `config/${configId}/retailers/products`, 'kpi'),
    req(configAccessToken, `config/${configId}/retailers/categories`, 'kpi'),
    req(configAccessToken, `config/${configId}/retailers/keywords`, 'kpi'),
  ]);

  const rawCategories = categoryLinks.map((l: any) => l.category);
  const categoryLinksCategories = uniqBy(rawCategories, 'id') as any[];

  const config = {
    brands: orderByName(brands),
    categories: orderByName(categories),
    products,
    retailers: orderByName(retailers),
    links,
    keywords,
    keywordLinks,
    categoryLinks,
    categoryLinksCategories,
    searchTerms,
    searchRetailers: orderByName(searchRetailers),
    categoryRetailers: orderByName(categoryRetailers),
    productRetailers: orderByName(productRetailers),
  };

  return config;
};

type SPSConfigKeys = keyof Omit<SPSConfig, 'config'>;

type SPSConfigEndoints = {
  [key in SPSConfigKeys]: string;
};

const createSPSConfigEndpoints = (
  configId: number | undefined
): SPSConfigEndoints => ({
  categories: `config/${configId}/categories`,
  brands: `config/${configId}/brands`,
  retailers: `config/${configId}/retailers`,
  products: `config/${configId}/products/v2`,
  links: `config/${configId}/links/v3`,
  linksMap: '',
  namesMap: '',
  rrpMap: '',
});

export const getSPSProducts = async (
  configAccessToken: string,
  configId: number | undefined,
  filter?: string
): Promise<ConfigProduct[]> => {
  const endpoints = createSPSConfigEndpoints(configId);
  const data = await req(configAccessToken, endpoints.products, 'sps');

  if (filter) {
    return (data || []).filter((p: any) =>
      filterNames(p?.handsetName || p?.name || '', filter)
    );
  }

  return data;
};

export const getSPSConfigForTable = async (
  configAccessToken: string,
  configId: number | undefined,
  dateRange?: [string, string]
): Promise<Partial<SPSConfig>> => {
  const endpoints = createSPSConfigEndpoints(configId);
  const startDate = getDayStartDate((dateRange || [''])[0]);
  const requests = [
    req(configAccessToken, endpoints.products, 'sps'),
    req(
      configAccessToken,
      endpoints.links,
      'sps',
      dateRange && dateRange.length
        ? {
            fromDate: startDate.split('T')[0],
            endDate: dateRange[1].split('T')[0],
          }
        : undefined
    ),
  ];
  const data = await Promise.all(requests);

  const pairs = data.map((d, i) => [['products', 'links'][i], d]);

  const config = fromPairs(pairs);

  const linksMap = config.links.map((l: any) => [
    `${l.retailer}-${l.product}`,
    l.url,
  ]);

  const namesMap = config.links.map((l: any) => {
    const product = config.products.find(
      (p: ConfigProduct) => String(p.id) === String(l.product)
    );

    return [String(l.product), product?.handsetName ?? product?.name];
  });

  const rrpMap = config.links.map((l: any) => {
    const product = config.products.find(
      (p: ConfigProduct) => String(p.id) === String(l.product)
    );

    return [String(l.product), product?.recommendedPrice];
  });

  config.linksMap = fromPairs(linksMap);
  config.namesMap = fromPairs(namesMap);
  config.rrpMap = fromPairs(rrpMap);

  return config;
};

export const getSPSConfig =
  (keys: SPSConfigKeys[]) =>
  async (
    configAccessToken: string,
    configId: number | undefined
  ): Promise<Partial<SPSConfig>> => {
    const endpoints = createSPSConfigEndpoints(configId);
    const requests = keys.map((key) =>
      req(configAccessToken, endpoints[key], 'sps')
    );
    const data = await Promise.all(requests);

    const ordered = ['categories', 'brands', 'retailers'];

    const pairs = data.map((d, i) => [
      keys[i],
      ordered.includes(keys[i] || '') ? orderByName(d) : d,
    ]);

    const config = fromPairs(pairs);

    return config;
  };

export const getMarketplacesConfig = async (
  configAccessToken: string,
  configId: number | undefined,
  marketplace: Marketplace = 'ceneo'
): Promise<MarketplaceConfig> => {
  const customer = await req(configAccessToken, 'customer', marketplace);
  const products = await req(
    configAccessToken,
    `config/${configId}/products`,
    marketplace
  );

  return {
    customer,
    products,
  };
};
