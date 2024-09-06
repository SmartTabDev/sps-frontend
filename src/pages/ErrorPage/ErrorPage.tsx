import Page from 'components/Page/Page';
import React from 'react';
import LoaderWrapper from 'components/LoaderWrapper';

const ErrorPage: React.FC = () => (
  <Page title="">
    <LoaderWrapper sx={{ flexGrow: 1 }}>Something went wrong</LoaderWrapper>
  </Page>
);

export default ErrorPage;
