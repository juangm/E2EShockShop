// -- Create an user in DB --
declare namespace Cypress {
  interface Chainable<Subject> {
    create_user(
      profile_data: object,
      address_data: object,
      payment_data: object
    ): Chainable<Subject>;
  }
}

Cypress.Commands.add('create_user', (profile_data, address_data, payment_data) => {
  cy.request('POST', 'http://localhost:80/register', profile_data).then((response) => {
    // Update with address information
    if (address_data !== null) {
      address_data['userID'] = response.body.id;
      cy.request('POST', 'http://localhost:80/addresses', address_data);
    }
    // Update with payment information
    if (payment_data !== null) {
      payment_data['userID'] = response.body.id;
      cy.request('POST', 'http://localhost:80/cards', payment_data);
    }
  });
});

// -- Delete a specific user in DB --
declare namespace Cypress {
  interface Chainable<Subject> {
    delete_all_user(): Chainable<Subject>;
  }
}
Cypress.Commands.add('delete_all_user', () => {
  cy.request('GET', 'http://localhost:80/customers').then((response) => {
    const list_customers = JSON.parse(response.body);
    for (let customer of list_customers['_embedded']['customer']) {
      cy.request('DELETE', `http://localhost:80/customers/${customer['id']}`);
    }
  });
});
