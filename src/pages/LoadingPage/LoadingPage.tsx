import Page from 'components/Page/Page';
import React from 'react';
import LoaderWrapper from 'components/LoaderWrapper';
import { CircularProgress } from '@mui/material';

const LoadingPage: React.FC = () => (
  <Page title="">
    <LoaderWrapper sx={{ flexGrow: 1 }}>
      <CircularProgress />
    </LoaderWrapper>
  </Page>
);

export default LoadingPage;
