import {
  useMemo, useCallback, useEffect, useState,
} from 'react';
import { getMarketplacesConfig } from 'api/getConfig';
import { useDispatch, useSelector } from 'react-redux';
import { Marketplace } from 'reducers/auth/auth';
import handleRequestError from 'reducers/auth/handleRequestError';

type Config = {
  clientRetailerName: string;
  links: string[];
  ids: string[];
};

const initialLinks: string[] = [];
const initialIds: string[] = [];

export function useConfig(marketplace: Marketplace, configId: number | undefined): Config {
  const dispatch = useDispatch();
  const configAccessToken = useSelector(
    (state: RootState) => state.auth.configAccessToken,
  );

  const [ids, setIds] = useState<Config['ids']>(initialIds);
  const [clientRetailerName, setClientRetailerName] = useState<
    Config['clientRetailerName']
  >('');
  const [links, setLinks] = useState<Config['links']>(initialLinks);

  const fetchData = useCallback(async () => {
    try {
      if (configAccessToken) {
        const res = await getMarketplacesConfig(configAccessToken, configId, marketplace);
        setIds(res.products.map((product) => String(product.id)));
        setClientRetailerName(res.customer.siteUrl);
        setLinks(res.products.map((product) => product.links).flat());
      }
    } catch (error) {
      dispatch(handleRequestError(error, 'useConfig'));
    }
  }, [marketplace, configAccessToken, dispatch, configId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const config = useMemo(
    () => ({
      ids,
      links,
      clientRetailerName,
    }),
    [ids, links, clientRetailerName],
  );

  return config;
}
