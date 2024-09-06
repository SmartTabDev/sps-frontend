describe('Notifications', () => {
  before(() => {
    cy.login('testCandy', ['sps-notifications']);
    cy.visit('/alerts', { timeout: 30000 });

    cy.contains('Create new').click();
    cy.get('#notification-name').type('Test notification');
    cy.get('#emails').type('demo@candy.pl,');
    cy.contains('Next').click();
  });

  it('can add trigger', () => {
    cy.contains('Specific price change').click();
    cy.get('[placeholder="Select trigger type"]').should('be.visible');
    cy.get('[placeholder="Select trigger type"]').click();
    cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click();
    cy.get('[value="Price jumps by"]').should('be.visible');
    cy.get('[id="value"]').type('100');
  });

  it('value field have validation on step change', () => {
    cy.get('[id="value"]').clear();
    cy.get('[id="value"]').type('0');
    cy.contains('Next').click();
    cy.get('[data-testid="CloseIcon"]').should('be.visible');
    cy.get('[data-testid="WarningIcon"]').should('be.visible');
    cy.contains('Alert sensitivity').click();
  });

  it('value field reset validation on type change', () => {
    cy.get('[value="Price jumps by"]').click();
    cy.get('.MuiAutocomplete-popper li[data-option-index="2"]').click();
    cy.contains('Next').click();
    cy.get('[data-testid="CloseIcon"]').should('not.exist');
    cy.get('[data-testid="WarningIcon"]').should('not.exist');
    cy.contains('Alert sensitivity').click();
  });

  it('can remove trigger', () => {
    cy.get('[data-icon="times-circle"]').click();
    cy.get('[value="Price lower than"]').should('not.exist');
  });
});
