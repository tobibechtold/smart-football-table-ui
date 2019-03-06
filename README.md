[![Build Status](https://travis-ci.com/tobibechtold/smart-football-table-ui.svg?token=8wVuwsJQRcfTbuqY4xHB&branch=master)](https://travis-ci.com/tobibechtold/smart-football-table-ui)
[![codecov](https://codecov.io/gh/tobibechtold/smart-football-table-ui/branch/master/graph/badge.svg?token=3aFLC5Mwqa)](https://codecov.io/gh/tobibechtold/smart-football-table-ui)
# SmartFootballTableUi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.1.

## MQTT messages
| topic      | Description                  | Example payload       |  Implemented |
| ---------- | ---------------------------- |---------------------- |------------- |
| score      | The teams' scores            | { "score": [ 0, 3 ] } | ✔            |
| foul       | Some foul has happened       | -                     | X            |
| gameover   | A match ended                | { "winner": 0 }       | X            |
| idle       | Is there action on the table | { "idle": true }      | X            |
| velocity   | current ball velocity        | { "velocity": 46.3 }  | ✔            |
| position   | current ball position        | { "x": 0, "y": 0 }    | ✔            |

## Run with docker

Run `docker-compose up -d --build` for a dev server. Navigate to `http://localhost:4200/`.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
