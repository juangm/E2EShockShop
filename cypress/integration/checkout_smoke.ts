/// <reference types="Cypress" />

describe('TodoList App', () => {
  it('shows learn link', function () {
    // Make sure no users are in the DB
    cy.delete_all_user();
    cy.fixture('user_data.json').then((data) => {
      cy.create_user(data.profile_data, data.address_data, data.payment_data);
    });
    cy.visit('http://localhost:80/index.html');
  });
});
