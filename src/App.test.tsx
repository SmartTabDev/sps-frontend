// import storeRegistry from 'storeRegistry';
import { screen } from '@testing-library/react';
import React from 'react';
// import { setAccess } from 'reducers/auth/actions';
import { render } from '__test__/test-utils-new';
import App from './App';

// const store = storeRegistry.getStore();

describe('App', () => {
  test('should render login form', () => {
    render(<App />);
    expect(screen.getByText('Log in to continue')).toBeInTheDocument();
  });

  // TODO: uncomment test after remove hardcoded access
  //   test('should return auth page if there is no assigned services to user', () => {
  //     store.dispatch(setAccess([])); // authorized, no services

  //     render(<App />);

  //     expect(
  //       screen.getByText(
  //         /we are sorry, but you do not have access\. please contact our customer support\./i
  //       )
  //     ).toBeInTheDocument();
  //   });
});
