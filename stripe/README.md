# Stripe

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.6.

Open a terminal and run:

`ng new stripe`

After install stripe-js and Angular Material:

`npm install @stripe/stripe-js`
`ng add @angular/material`


Create three components with command:
`ng g c cancel`
`ng g c sucess`
`ng g c checkout`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Deploy application
Docker:Dockerfile
docker-compose.yml
version: "4.32.0"
