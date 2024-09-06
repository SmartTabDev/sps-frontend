import { AppThunk } from 'types/AppThunk';
import {
  getKPIConfig,
  getSPSConfig,
  getSPSConfigForTable,
  getSPSProducts,
} from 'api/getConfig';
import getSchedule from 'api/SPS/getSchedule';
import getConfig from 'api/SPS/getConfig';
import handleRequestError from '../auth/handleRequestError';
import { configSlice } from './config';

export const {
  setLoading,
  setIsDaily,
  setSPSConfig,
  setSPSConfigForTable,
  setKPIConfig,
  setSPSConfigLoading,
  setPCFiltersLoading,
  setBaseConfig,
  setSPSProducts,
} = configSlice.actions;

export const getSPSConfigProducts =
  (configId: number, query: string, onEmpty: () => void): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      const { configAccessToken } = getState().auth;
      const products = await getSPSProducts(configAccessToken, configId, query);

      if (onEmpty && products.length === 0) {
        onEmpty();
      }

      dispatch(setSPSProducts({ products }));
    } catch (error) {
      dispatch(handleRequestError(error, 'getSPSConfigProducts'));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getSPSServiceConfig =
  (configId?: number): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      const { configAccessToken } = getState().auth;

      const config = await getSPSConfigForTable(configAccessToken, configId);
      dispatch(setSPSConfig({ config }));
      const isDaily = await getSchedule(configAccessToken, configId);
      dispatch(setIsDaily(isDaily));
      const baseConfig = await getConfig(configAccessToken, configId);
      dispatch(setBaseConfig(baseConfig));
    } catch (error) {
      dispatch(handleRequestError(error, 'getSPSServiceConfig'));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getKPIServiceConfig =
  (configId: number | undefined): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      const { configAccessToken } = getState().auth;

      const config = await getKPIConfig(configAccessToken, configId);
      dispatch(setKPIConfig({ config }));
    } catch (error) {
      dispatch(handleRequestError(error, 'getKPIServiceConfig'));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getSPSFilters =
  (configId: number): AppThunk =>
  async (dispatch, getState) => {
    try {
      const { configAccessToken } = getState().auth;

      const config = await getSPSConfig(['retailers', 'brands', 'categories'])(
        configAccessToken,
        configId
      );

      dispatch(
        setSPSConfig({
          config,
        })
      );
    } catch (error) {
      dispatch(handleRequestError(error, 'getSPSFilters'));
    }
  };

export const getSPSAlertsConfig =
  (configId: number): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setSPSConfigLoading(true));
      const { configAccessToken } = getState().auth;

      const config = await getSPSConfig([
        'retailers',
        'brands',
        'categories',
        'products',
      ])(configAccessToken, configId);
      dispatch(setSPSConfig({ config }));
      const baseConfig = await getConfig(configAccessToken, configId);
      dispatch(setBaseConfig(baseConfig));
    } catch (error) {
      dispatch(handleRequestError(error, 'getSPSAlertsConfig'));
    } finally {
      dispatch(setSPSConfigLoading(false));
    }
  };

// eslint-disable-next-line max-len
export const getProductComparisonFilters =
  (configId: number): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setPCFiltersLoading(true));
      const { configAccessToken } = getState().auth;

      const config = await getSPSConfig(['retailers', 'products'])(
        configAccessToken,
        configId
      );
      dispatch(setSPSConfig({ config }));
    } catch (error) {
      dispatch(handleRequestError(error, 'getServiceConfig'));
    } finally {
      dispatch(setPCFiltersLoading(false));
    }
  };
