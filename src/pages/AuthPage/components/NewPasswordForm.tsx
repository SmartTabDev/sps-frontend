import React, {
  FormEvent, useCallback, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import setNewPassword from 'reducers/auth/setNewPassword';
import { setPasswordChangeError } from 'reducers/auth/actions';
import { SubmitButton } from './Form/SubmitButton';
import { Header } from './Form/Header';
import { StyledForm } from './Form/Form';
import { PasswordInput } from './Form/PasswordInput';
import { validatePassword } from './validatePassword';

export function NewPasswordForm(): JSX.Element {
  const dispatch = useDispatch();
  const [newPasswordValue, setNewPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
  const { search } = useLocation();
  const { resetToken } = queryString.parse(search);

  const { loginLoading } = useSelector((state: RootState) => state.auth);
  const passwordChanged = useSelector(
    (state: RootState) => state.auth.passwordChanged,
  );
  const passwordChangeError = useSelector(
    (state: RootState) => state.auth.passwordChangeError,
  );

  const validationError = validatePassword({
    password: newPasswordValue,
  });

  const isPasswordMatch = newPasswordValue === confirmPasswordValue;

  const isButtonDisabled = newPasswordValue === ''
  || Boolean(validationError) === true
  || isPasswordMatch === false;

  useEffect(() => {
    dispatch(setPasswordChangeError(''));
  }, [dispatch]);

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (resetToken) {
        dispatch(setNewPassword(newPasswordValue, resetToken as string));
      }
    },
    [dispatch, resetToken, newPasswordValue],
  );

  if (passwordChanged) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Header
        title="Set new password"
        error={passwordChangeError}
        subTitle="Enter a new password for your account"
      />
      <StyledForm onSubmit={onSubmit} noValidate>
        <PasswordInput
          value={newPasswordValue}
          onChange={setNewPasswordValue}
          disabled={loginLoading}
          label="New password"
          error={Boolean(validationError)}
          helperText={validationError}
        />
        <PasswordInput
          value={confirmPasswordValue}
          onChange={setConfirmPasswordValue}
          disabled={loginLoading}
          label="Confirm password"
          error={confirmPasswordValue.length > 0 && isPasswordMatch === false}
          helperText={
            confirmPasswordValue.length > 0 && isPasswordMatch === false
              ? 'Passwords must match'
              : ''
          }
        />
        <SubmitButton
          text="Change password"
          loading={loginLoading}
          disabled={isButtonDisabled}
        />
      </StyledForm>
    </>
  );
}
