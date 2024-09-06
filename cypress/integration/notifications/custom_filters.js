describe('Notifications', () => {
  before(() => {
    cy.login('testCandy', [
      'sps-notifications',
    ]);
    cy.visit('/alerts', { timeout: 30000 });

    cy.contains('Create new').click();
    cy.get('#notification-name').type('Test notification');
    cy.get('#emails').type('demo@candy.pl,');
    cy.location('pathname').should('match', /\/create$/);
    cy.contains('Next').click();
    cy.contains('Next').click();
  });

  it('shows error message if any filter added', () => {
    cy.contains('Custom categories').click();
    cy.contains('Save').click();
    cy.contains('Mandatory information is missing').should('be.visible');
  });

  it('can add filter', () => {
    cy.contains('+ Add filter').click();
    cy.contains('Category').click();
    cy.contains('+ Add filter').click();
    cy.contains('Retailer').click();
    cy.contains('+ Add Brand').click();
  });

  it('can remove filter', () => {
    cy.get('[data-testid="remove-brand"]').click();
    cy.get('[data-testid="remove-retailer"]').click();
    cy.get('[data-testid="remove-category"]').click();
  });
});
