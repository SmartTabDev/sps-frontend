Cypress.Commands.add('login', (login, modules) => {
  const dispatch = (action) => cy.window().its('store').invoke('dispatch', action);

  const types = {
    testCandy: {
      email: 'test-candy@modvise.com',
      password: 'Modvise1@',
    },
  };

  const user = types[login];

  // REACT_APP_CUBE_JS_API = '',
  // REACT_APP_CONFIG_API = '',
  // REACT_APP_NOTIFICATION_API,

  cy.request({
    url: `${Cypress.env('REACT_APP_AUTH_API')}/auth/login`,
    method: 'POST',
    body: {
      email: user.email,
      password: user.password,
    },
  }).then(({ body }) => {
    const { accessToken, refreshToken } = body;

    cy.visit('/');

    dispatch({
      type: 'auth/setCognitoTokens',
      payload: {
        accessToken,
        refreshToken,
      },
    });

    cy.request({
      url: `${Cypress.env('REACT_APP_AUTH_API')}/config/access`,
      method: 'GET',
      headers: {
        accesstoken: accessToken,
      },
    }).then(({ body: accessBody }) => {
      const { access } = accessBody;

      dispatch({
        type: 'auth/setConfigAccessToken',
        payload: access,
      });

      dispatch({
        type: 'auth/setAccess',
        payload: modules,
      });

      // cy.window()
      //   .its('store')
      //   .invoke('getState')
      //   .then((state) => {
      //     cy.log(state);
      //   });
    });
  });
});
