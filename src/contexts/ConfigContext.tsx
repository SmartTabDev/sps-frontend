/* eslint-disable @typescript-eslint/no-empty-function */
import { configApi } from 'api';
import React, {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalStorage } from 'react-use';
// redux
import handleRequestError from 'reducers/auth/handleRequestError';
// @types
import { Config } from 'types/Config';

// ----------------------------------------------------------------------

export type ConfigContextProps = {
  isMultimarketError: string | undefined;
  isMultimarketLoading: boolean;
  configs: Config[];
  configId: number | undefined;
  regionCode: string | undefined;
  onConfigChange: (configId: number) => void;
  onConfigReset: () => void;
};

const initialState: ConfigContextProps = {
  isMultimarketError: undefined,
  isMultimarketLoading: false,
  configs: [],
  configId: undefined,
  regionCode: undefined,
  onConfigChange: () => {},
  onConfigReset: () => {},
};

const ConfigContext = createContext(initialState);

type ConfigProviderProps = {
  children: ReactNode;
};

function ConfigProvider({ children }: ConfigProviderProps) {
  const dispatch = useDispatch();
  const [isError, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [configs, setConfigs] = useState<Config[]>([]);
  const [configId, setConfigId] = useState<number | undefined>();
  const [regionCode, setRegionCode] = useState<string | undefined>();
  const [preservedConfigId, setPreservedConfigId] = useLocalStorage<
    number | undefined
  >('configId');

  const configAccessToken = useSelector(
    (state: RootState) => state.auth.configAccessToken
  );

  const fetchConfigs = useCallback(async (): Promise<Config[]> => {
    let result = [];

    if (configAccessToken) {
      try {
        const { data } = await configApi({
          method: 'get',
          url: '/config',
          headers: {
            accesstoken: configAccessToken,
          },
        });

        result = data;
      } catch (e) {
        dispatch(handleRequestError(e, 'fetchConfigs'));
      }
    }

    return result;
  }, [dispatch, configAccessToken]);

  useEffect(() => {
    async function fetchData() {
      setError(undefined);
      setIsLoading(true);

      const configs = await fetchConfigs();

      if (!configs.length) {
        setError('Something went wrong');
        setIsLoading(false);
      }

      setConfigs(configs);
      setIsLoading(false);
    }

    fetchData();
  }, [fetchConfigs]);

  // set inital config
  useEffect(() => {
    if (configs.length && configId === undefined) {
      const plRegion = configs.find((c) => c.code === 'PL');
      const firstConfig = configs[0];
      const preservedConfig = configs.find(
        (c) => c.id === Number(preservedConfigId)
      );

      if (preservedConfig) {
        setConfigId(preservedConfig.id);
        setRegionCode(preservedConfig.code);
        return;
      }

      if (plRegion) {
        setConfigId(plRegion.id);
        setRegionCode(plRegion.code);
        return;
      }

      if (firstConfig) {
        setConfigId(firstConfig.id);
        setRegionCode(firstConfig.code);
        return;
      }
    }
  }, [configs, configId, preservedConfigId]);

  // reset config on unmount
  useEffect(() => {
    return () => {
      handleResetConfig();
    };
  }, []);

  const handleConfigChange = useCallback(
    (_configId: number) => {
      const config = configs.find((c) => c.id === _configId);

      if (config) {
        setConfigId(config.id);
        setRegionCode(config.code);
        setPreservedConfigId(config.id);
      }
    },
    [configs]
  );

  const handleResetConfig = useCallback(() => {
    setConfigId(undefined);
    setRegionCode(undefined);
    setConfigs([]);
    setError(undefined);
    setPreservedConfigId(undefined);
  }, []);

  return (
    <ConfigContext.Provider
      value={{
        isMultimarketError: isError,
        isMultimarketLoading: isLoading || !configId,
        configs,
        configId,
        regionCode,
        onConfigChange: handleConfigChange,
        onConfigReset: handleResetConfig,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export { ConfigProvider, ConfigContext };
