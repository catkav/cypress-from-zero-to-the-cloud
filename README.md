Sample project to practice with [Cypress](https://cypress.io).

## Pre-requirements

It is required to have git, Node.js and npm installed to clone and run this project.

> I used versions `2.34.1`, `v18.15.0`, and `9.5.0.` of git, Node.js and npm, respectively. I suggest you use the same or later LTS versions.

## Installation

After cloning the project and accessing it, run `npm install` (or `npm i` for the short version) to install the dev dependencies.

## Tests

In this project, you can run tests in both headless and interactive modes.

## Headless mode

Run `npm test` (or `npm t` for the short version) to run the tests in headless mode.

Or, run `npm run test:mobile` to run the tests in headless mode in a mobile viewport.

## Interactive mode

Or, run `npm run cy:open` to open the Cypress App and run the tests in interactive mode in a desktop viewport.

Or, run `npm run cy:mobile` to open the Cypress App and run the tests in interactive mode in a mobile viewport.
