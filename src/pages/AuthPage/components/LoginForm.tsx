import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import login from 'reducers/auth/login';
import {
  setPasswordChanged,
  setEmail,
  setEmailSent,
  setPassword,
  setRememberMe,
  setLoginLoading,
} from 'reducers/auth/actions';
import Box from '@mui/material/Box';
// import TextButton from 'components/TextButton';
// import { Link } from 'react-router-dom';
import { Footer } from './Form/Footer';
import { EmailInput } from './Form/EmailInput';
import { PasswordInput } from './Form/PasswordInput';
import { Header } from './Form/Header';
import { SubmitButton } from './Form/SubmitButton';
import { StyledForm } from './Form/Form';
import { RememberMe } from './Form/RememberMe';

export function LoginForm(): JSX.Element {
  const { loginLoading, error, email, password, rememberMe } = useSelector(
    (state: RootState) => state.auth
  );

  const [emailValue, setEmailValue] = useState(email);
  const [passwordValue, setPasswordValue] = useState(password);
  const [rememberMeValue, setRememberMeValue] = useState(rememberMe);

  const dispatch = useDispatch();

  useEffect(() => {
    // it reset state which redirects to this form
    dispatch(setPasswordChanged(false));
    dispatch(setEmailSent(false));
    dispatch(setLoginLoading(false));
  }, [dispatch]);

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      dispatch(setEmail(emailValue)); // this value should be passed to login action
      dispatch(setPassword(passwordValue)); // this value should be passed to login action
      dispatch(setRememberMe(rememberMeValue)); // this value should be passed to login action
      dispatch(login());
    },
    [dispatch, emailValue, passwordValue, rememberMeValue]
  );

  return (
    <>
      <Header title="Welcome" error={error} subTitle="Log in to continue" />
      <StyledForm onSubmit={onSubmit}>
        <EmailInput
          value={emailValue}
          onChange={setEmailValue}
          disabled={loginLoading}
        />
        <PasswordInput
          value={passwordValue}
          onChange={setPasswordValue}
          disabled={loginLoading}
        />
        <Box display="flex" justifyContent="space-between" marginTop="20px">
          <RememberMe
            value={rememberMeValue}
            disabled={loginLoading}
            onChange={setRememberMeValue}
          />
          {/* <Link to="/password/reset" style={{ display: 'flex' }}>
            <TextButton>Forgot password?</TextButton>
          </Link> */}
        </Box>
        <SubmitButton text="Log in" loading={loginLoading} />
        <Footer />
      </StyledForm>
    </>
  );
}
