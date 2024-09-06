describe('Notifications', () => {
  before(() => {
    cy.login('testCandy', [
      'sps-notifications',
    ]);
    cy.visit('/alerts', { timeout: 30000 });
  });

  it('can view module', () => {
    cy.location('pathname').should('match', /\/alerts$/);
  });

  it('can open form', () => {
    cy.contains('Create new').click();
    cy.location('pathname').should('match', /\/create$/);
  });

  it('can go to next step', () => {
    cy.contains('Next').click();
    cy.contains('Next').click();
    cy.contains('Save').should('be.visible');
  });

  it('can\'t save empty form', () => {
    cy.get('[data-testid="CloseIcon"]').should('be.visible');
    cy.get('[data-testid="WarningIcon"]').should('be.visible');
    cy.contains('Save').click();
    cy.contains('Mandatory information is missing.').should('be.visible');
  });

  it('can go to prev step', () => {
    cy.contains('Settings').click();
    cy.contains('Next').should('be.visible');
  });

  it('can cancel add notification', () => {
    cy.contains('Cancel').click();
    cy.contains('Warning').should('be.visible');
    cy.contains('Leave').click();
    cy.location('pathname').should('not.match', /\/create$/);
  });
});
