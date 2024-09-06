import React, {
  FormEvent, useCallback, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import login from 'reducers/auth/login';
import { setNewPassword } from 'reducers/auth/actions';
import { SubmitButton } from './Form/SubmitButton';
import { Header } from './Form/Header';
import { StyledForm } from './Form/Form';
import { PasswordInput } from './Form/PasswordInput';
import { validatePassword } from './validatePassword';

export function CompleteNewPasswordForm(): JSX.Element {
  const [newPasswordValue, setNewPasswordValue] = useState('');

  const { loginLoading, error } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const validationError = validatePassword({
    password: newPasswordValue,
  });

  const isButtonDisabled = newPasswordValue === '' || Boolean(validationError) === true;

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      dispatch(setNewPassword(newPasswordValue)); // this value should be passed to login action
      dispatch(login());
    },
    [dispatch, newPasswordValue],
  );

  return (
    <>
      <Header
        title="Set new password"
        error={error}
        subTitle="Enter a new password for your account"
      />
      <StyledForm onSubmit={onSubmit}>
        <PasswordInput
          value={newPasswordValue}
          onChange={setNewPasswordValue}
          disabled={loginLoading}
          label="New password"
          error={Boolean(validationError)}
          helperText={validationError}
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
