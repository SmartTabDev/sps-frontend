import { authSlice } from './auth';

export const {
  setEmail,
  setPassword,
  setCognitoTokens,
  setCubeAccessToken,
  setConfigAccessToken,
  setError,
  setLoginLoading,
  setRefreshTokensLoading,
  setLogout,
  setNewPassword,
  setConfirmPassword,
  setAccess,
  setLoginSuccess,
  setRememberMe,
  setLoginChallenge,
  setEmailSent,
  setEmailSentError,
  setPasswordChanged,
  setPasswordChangeError,
} = authSlice.actions;
