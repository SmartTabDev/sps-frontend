import { createSlice } from '@reduxjs/toolkit';

export const DigitalShelfServices = [
  'kpi',
  'kpi-soc',
  'kpi-sos',
  'kpi-av',
  'kpi-rnr',
] as const;

export const PriceAnalysisServices = ['sps', 'sps-notifications'] as const;
export const MarketplaceServices = [
  'ceneo',
  'idealo',
  'allegro',
  'shopee',
] as const;

export type Marketplace = (typeof MarketplaceServices)[number];
export type PriceAnalysis = (typeof PriceAnalysisServices)[number];
export type DigitalShelf = (typeof DigitalShelfServices)[number];

export type Service =
  | PriceAnalysis
  | DigitalShelf
  | Marketplace
  | 'prm'
  | 'market-radar'
  | 'sps-rrp-index'
  | 'oam-stats'
  | 'content-module'
  | 'eye-level';

export type AuthState = {
  rememberMe: boolean;
  email: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
  idToken: string; // old
  accessToken: string;
  refreshToken: string;
  cubeAccessToken: string;
  configAccessToken: string;
  isAuthenticated: boolean;
  error: string;
  loginLoading: boolean;
  refreshTokensLoading: boolean;
  emailSent: boolean;
  emailSentError: string;
  passwordChanged: boolean;
  passwordChangeError: string;
  services: Service[];
  challenge: boolean;
};

const initialState: AuthState = {
  rememberMe: false,
  email: '',
  password: '',
  newPassword: '',
  confirmPassword: '',
  accessToken: '',
  refreshToken: '',
  configAccessToken: '',
  cubeAccessToken: '',
  isAuthenticated: false,
  idToken: '',
  loginLoading: false,
  refreshTokensLoading: false,
  error: '',
  emailSent: false,
  emailSentError: '',
  passwordChanged: false,
  passwordChangeError: '',
  services: [],
  challenge: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setNewPassword(state, action) {
      state.newPassword = action.payload;
    },
    setConfirmPassword(state, action) {
      state.confirmPassword = action.payload;
    },
    setCognitoTokens(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.email = '';
      state.password = '';
      state.newPassword = '';
    },
    setCubeAccessToken(state, action) {
      state.cubeAccessToken = action.payload.access;
    },
    setConfigAccessToken(state, action) {
      state.configAccessToken = action.payload;
    },
    setAccess(state, action) {
      const hardcodedServices: Service[] = ['content-module', 'eye-level'];
      state.services = [...action.payload, ...hardcodedServices];
      state.isAuthenticated = true;
    },
    setError(state, action) {
      state.error = action.payload;
      state.newPassword = '';
    },
    setLoginLoading(state, action) {
      state.loginLoading = action.payload;

      if (action.payload === true) {
        state.error = '';
      }
    },
    setRefreshTokensLoading(state, action) {
      state.refreshTokensLoading = action.payload;
    },
    setEmailSent(state, action) {
      state.emailSent = action.payload;
    },
    setEmailSentError(state, action) {
      state.emailSentError = action.payload;
    },
    setPasswordChanged(state, action) {
      state.passwordChanged = action.payload;
    },
    setPasswordChangeError(state, action) {
      state.passwordChangeError = action.payload;
    },
    setLogout(state) {
      state.isAuthenticated = false;
      state.refreshToken = '';
      state.accessToken = '';
      state.cubeAccessToken = '';
      state.configAccessToken = '';
      state.services = [];
      state.idToken = '';
    },
    setLoginSuccess(state) {
      state.error = '';
    },
    setRememberMe(state, action) {
      state.rememberMe = action.payload;
    },
    setLoginChallenge(state, action) {
      state.challenge = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
