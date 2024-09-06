import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Logo from 'components/Logo';
import { useSelector } from 'react-redux';
import BackgroundElements from './components/Layout/Background';
import Blog from './components/Layout/Blog';
import LeftSideBox from './components/Layout/LeftSideBox';
import RightSideBox from './components/Layout/RightSideBox';
import StyledBox from './components/Layout/StyledBox';
import StyledPaper from './components/Layout/StyledPaper';
import { LoginForm } from './components/LoginForm';
import { ResetPasswordForm } from './components/ResetPasswordForm';
import { NewPasswordForm } from './components/NewPasswordForm';
import { CompleteNewPasswordForm } from './components/CompleteNewPasswordForm';
import { EmailSent } from './components/EmailSent';

const AuthRoutes: React.FC = () => {
  const { challenge } = useSelector((state: RootState) => state.auth);

  return (
    <StyledBox>
      <Logo withWrapper />
      <BackgroundElements />
      <StyledPaper>
        <LeftSideBox>
          <Switch>
            {challenge && [
              <Route key="new-password-form" path="/password/new-complete">
                <CompleteNewPasswordForm />
              </Route>,
              <Redirect key="new-password-redirect" to="/password/new-complete" />,
            ]}
            <Route exact path="/">
              <LoginForm />
            </Route>
            <Route path="/password/reset">
              <ResetPasswordForm />
            </Route>
            <Route path="/password/new">
              <NewPasswordForm />
            </Route>
            <Route path="/password/email-sent">
              <EmailSent />
            </Route>
            <Redirect to="/" />
          </Switch>
        </LeftSideBox>
        <RightSideBox>
          <Blog />
        </RightSideBox>
      </StyledPaper>
    </StyledBox>
  );
};

export default AuthRoutes;
