# React-Reactive-Currency-Project

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


## Demo
[The project is live here](https://hs-real-time-currency.herokuapp.com/)

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
