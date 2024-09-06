import Box from '@mui/material/Box';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setEmailSent } from 'reducers/auth/actions';
import { BackToLoginButton } from './Form/BackToLoginButton';
import { Header } from './Form/Header';

export function EmailSent(): JSX.Element {
  const dispatch = useDispatch();
  const {
    state: { email },
  } = useLocation<{ email: string }>();

  useEffect(() => {
    dispatch(setEmailSent(false));
  }, [dispatch]);

  return (
    <Box
      style={{ height: '100%' }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Header
        title=""
        subTitle={`We have sent an email with instructions to ${email}`}
      />
      <BackToLoginButton />
    </Box>
  );
}
