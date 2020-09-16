/// <reference types="Cypress" />

describe('Checkout Flow - Smoke', () => {
  beforeEach(() => {
    // Make sure no users are in the DB
    cy.delete_all_user();
  });

  it('Happy Path - User with valid address and payment method', function () {
    // Create test user
    cy.fixture('user_data.json').then((data) => {
      cy.create_user(data.profile_data, data.address_data, data.payment_data);
    });

    // Add element to the cart
    cy.visit('http://localhost:80/index.html');
    cy.xpath('//*[@id="hot"]//*[@class="owl-item"][2]//*[@class="text"]//a').click();
    cy.get('#buttonCart').click();
    // Make sure element is in the cart before clicking
    cy.get('#numItemsInCart').should('have.text', '1 item(s) in cart');
    cy.xpath('//*[@id="basket-overview"]//a').click();

    // Process the order and check one order is visible and processed
    cy.get('#orderButton').click();
    cy.xpath('//tbody[@id="tableOrders"]/tr').should('be.visible');
  });
  it('User with address and NO payment method', function () {
    // Create test user
    cy.fixture('user_data.json').then((data) => {
      cy.create_user(data.profile_data, data.address_data, null);
    });

    // Add element to the cart
    cy.visit('http://localhost:80/index.html');
    cy.xpath('//*[@id="hot"]//*[@class="owl-item"][2]//*[@class="text"]//a').click();
    cy.get('#buttonCart').click();
    // Make sure element is in the cart before clicking
    cy.get('#numItemsInCart').should('have.text', '1 item(s) in cart');
    cy.xpath('//*[@id="basket-overview"]//a').click();

    // Check error is displayed with trying to process the order
    cy.get('#number').should('have.text', 'No credit card saved for user.');
    cy.get('#orderButton').click();
    cy.xpath('//*[@id="user-message"]/*[@role="alert"]')
      .should('be.visible')
      .and('have.text', '× Could not place order. Missing shipping or payment information.');
  });
  it('User with address and NO shipping address', function () {
    // Create test user
    cy.fixture('user_data.json').then((data) => {
      cy.create_user(data.profile_data, null, data.payment_data);
    });

    // Add element to the cart
    cy.visit('http://localhost:80/index.html');
    cy.xpath('//*[@id="hot"]//*[@class="owl-item"][2]//*[@class="text"]//a').click();
    cy.get('#buttonCart').click();
    // Make sure element is in the cart before clicking
    cy.get('#numItemsInCart').should('have.text', '1 item(s) in cart');
    cy.xpath('//*[@id="basket-overview"]//a').click();

    // Check error is displayed with trying to process the order
    cy.get('#address').should('have.text', 'No address saved for user.');
    cy.get('#orderButton').click();
    cy.xpath('//*[@id="user-message"]/*[@role="alert"]')
      .should('be.visible')
      .and('have.text', '× Could not place order. Missing shipping or payment information.');
  });
});
