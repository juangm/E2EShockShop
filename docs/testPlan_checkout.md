# Test Scenarios

## Anonymous User - Happy path

```Gherkin
Given Anonymous user navigates to shop
And User adds few products to the cart
When User does the checkout adding his address and card
Then User's order is processed
```

## Anonymous User - Sad path

```Gherkin
Given Anonymous user navigates to shop
And User adds few products to the cart
When User does the checkout without adding address or card
Then User's order is NOT processed
```

## Logged User - Happy path

```Gherkin
Given User with an account with address and card stored
And User navigates to shop and login
And User adds few products to the cart
When User does the checkout
Then data for address and card are automatically filled
And User's order is processed
```

## Payment validation

```Gherkin
Given User with an account with address
And User navigates to shop and login
And User adds few products to the cart
When User does the checkout with invalid credit card
Then User's order is NOT processed
```

## Address validation

```Gherkin
Given User with an account with card stored
And User navigates to shop and login
And User adds few products to the cart
When User does the checkout with invalid address
Then User's order is NOT processed
```
