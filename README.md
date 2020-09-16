# E2E Testing - Sock Shop

## Description

- Application to be tested [Sock Shop](https://microservices-demo.github.io/)
- Create a few tests for the checkout flow using Cypress (JS/ TS)

## Installing Sock Shop

- Have installed in the system:
  - `docker`
  - `docker-compose`
- Follow instructions in the [link](https://microservices-demo.github.io/docs/quickstart.html)
- Before running the tests make sure the shop is running and it is available in `http://localhost:80`

## E2E with Cypress

### Installation

- NodeJS
- Run in the working directory `yarn install`

### Running Cypress

- To open cypress console: `yarn cy`
- Run checkout scenarios with electron in headless mode: `yarn cy:electron`
- Run checkout scenarios with latest chrome: `yarn cy:chrome`

## Test Scenarios for Checkout Process

### Assumptions

- We are going to focus the checkout process, so mainly the checkout screen
- Focusing mainly in the functionality of checkout (not visual elements)
- Focus order flow is properly set after authorization of payment
- Not focus in how the user is logged or created
- Not focus in articles or different categories
- Not checking address or payment validation (functionality not implemented)

### Test Scenarios

- Test scenarios are located in docs folder [link](docs/testPlan_checkout.md)

## Bugs/Features

- :x: => Not possible to update card number or shipping address from the frontend (Using the API as workaround)
- :warning: => Button for using coupons is not working - Functionality not implemented
- :warning: => Not possible to create orders bigger than 100\$
- :warning: => Not possible validate payments (invalid cards are accepted)
- :warning: => Not possible validate address (invalid address are accepted)

## Future Improvements

- [ ] Improve assertions in checkout (check quantity amount of orders, updating orders, etc)
- [ ] Improve the cleaning of the environment after each test (delete user, order, cart, etc. created during the test scenario)
- [ ] Relay in API to get all elements of catalogue and select random ones
- [ ] Implement PageObjects for the pages in application
- [ ] Implement functional tests for the API endpoints [documentation](https://microservices-demo.github.io/api/index.html)
