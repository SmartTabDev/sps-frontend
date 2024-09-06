describe('Notifications', () => {
  before(() => {
    cy.login('testCandy', ['sps-notifications']);
    cy.visit('/alerts', { timeout: 30000 });
  });

  it('can add and remove simple notification', () => {
    cy.contains('Create new').click();
    cy.get('#notification-name').type('Test notification');
    cy.get('#description').type('Test description');
    cy.get('#emails').type('demo@candy.pl,'); // TODO: VALIDATION
    cy.contains('Next').click();
    cy.contains('Next').click();
    cy.contains('Save').click();
    cy.location('pathname').should('not.match', /\/create$/);
    cy.get('.MuiCircularProgress-root').should('be.visible');
    cy.contains('Test notification').should('be.visible');

    cy.get('.MuiDataGrid-main .MuiDataGrid-virtualScroller').scrollTo(
      'bottomRight',
    );

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500); // virtual scroll

    cy.get('.MuiDataGrid-main').find('[data-rowindex]').as('rows');
    cy.get('@rows').last().find('.MuiDataGrid-actionsCell button').click();
    cy.get('[role="menuitem"]').last().click();
    cy.get('.MuiDialogActions-root').contains('Delete').click();
    cy.contains('Test notification').should('not.exist');
  });
});
