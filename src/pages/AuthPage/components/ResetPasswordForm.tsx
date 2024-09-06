import React, {
  FormEvent, useCallback, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import sendEmail from 'reducers/auth/sendEmail';
import { Redirect } from 'react-router-dom';
import { setEmailSentError } from 'reducers/auth/actions';
import { EmailInput } from './Form/EmailInput';
import { Header } from './Form/Header';
import { SubmitButton } from './Form/SubmitButton';
import { StyledForm } from './Form/Form';

export function ResetPasswordForm(): JSX.Element {
  const [emailValue, setEmailValue] = useState('');

  const loginLoading = useSelector(
    (state: RootState) => state.auth.loginLoading,
  );
  const emailSent = useSelector((state: RootState) => state.auth.emailSent);
  const emailSentError = useSelector(
    (state: RootState) => state.auth.emailSentError,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setEmailSentError(''));
  }, [dispatch]);

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      dispatch(sendEmail(emailValue));
    },
    [dispatch, emailValue],
  );

  if (emailSent) {
    return (
      <Redirect to={{
        pathname: '/password/email-sent',
        state: { email: emailValue },
      }}
      />
    );
  }

  return (
    <>
      <Header
        title="Enter email"
        error={emailSentError}
        subTitle="We will send you a link with password recovery instructions"
      />
      <StyledForm onSubmit={onSubmit}>
        <EmailInput
          value={emailValue}
          onChange={setEmailValue}
          disabled={loginLoading}
        />
        <SubmitButton text="Send" loading={loginLoading} />
      </StyledForm>
    </>
  );
}
