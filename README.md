# React-Reactive-Currency-Project

## Demo
[The project is live here](https://hs-real-time-currency.herokuapp.com/)

## Functional Services

The project was decomposed into three core microservices. All of them are independently deployable applications, organized around certain business domains.


### Historical Currency Service

Root URL: https://currency-app-spring-boot.herokuapp.com


Method	| Path	| Description	| User authenticated	| Available from UI
------------- | ------------------------------------ | ------------- |:-------------:|:----------------:|
GET	| /currency/{date}/{baseCurrency}?targetCurrencies={targetCurrencies}	| Get specified historical currency data	|  | 	X

### Real Time Currency Service (SSE)

Root URL: http://hs-real-time-currency-backend.herokuapp.com

Method	| Path	| Description	| User authenticated	| Available from UI
------------- | ------------------------------------ | ------------- |:-------------:|:----------------:|
GET	| /currency/random	| Get random currency event stream	|  | 	X

### Spring Boot Historical Currency Backend
[Historical currency backend API project address](https://github.com/hakansander/currencyProject)

### Spring Boot Real Time Currency Backend (Server Sent Events)
[Server Sent Events backend project address](https://github.com/hakansander/Spring-Reactive-Currency-Project)

## Prerequisites
- Good understanding of React
- Knowledge of Hooks
- Knowledge of HTML
- Knowledge of CSS

## Tools Needed
- npm
- A Web IDE (WebStorm, Visual Studio Code)

## Deploy to:
[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Technology Stack

- React
- Hooks
- Redux 
- Axios
- Server Sent Events (SSE)
- HTML
- CSS
- Javascript

## TO DO

- [ ] Add cost/benefit amount to the purchase process
- [ ] Change color to red on loss and to green on benefit
- [ ] Add Router for navigation
- [ ] Refactor component tree by adding containers
- [ ] Add Redux for states 
- [ ] Refactor UI 
- [ ] Create different packages that show the total amount of purchase in desired currency
- [ ] Add comparison of different packages in order to find the most beneficial or costly operations historically 
- [ ] Implement unit tests
- [ ] Implement the date picker from scratch
- [ ] Solve operation date UI bug (Replace the places of month and day on display in order to show in the following format: dd-mm-yyyy)
