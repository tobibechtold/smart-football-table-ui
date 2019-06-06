[![Build Status](https://travis-ci.com/smart-football-table/smart-football-table-ui.svg?branch=master)](https://travis-ci.com/smart-football-table/smart-football-table-ui)
[![codecov](https://codecov.io/gh/smart-football-table/smart-football-table-ui/branch/master/graph/badge.svg?token=3aFLC5Mwqa)](https://codecov.io/gh/smart-football-table/smart-football-table-ui)
[![BCH compliance](https://bettercodehub.com/edge/badge/smart-football-table/smart-football-table-ui?branch=master)](https://bettercodehub.com/)
# SmartFootballTableUi

This is the user interface of the @smart-football-table project. It is purely developed with Angular and uses the MQTT protocol to communicate with the other modules of this project.

## Prerequesites

To interact with the UI and run the unit tests a mqtt broker with websockets enabled is needed. If your mqtt broker is not running on localhost:9001 (websocket port) you will have to edit the `environment.ts` and `environment.prod.ts` files. See chapter Configuration for further information.

## Configuration

In order to configure the UI you can edit the `environment.ts` and `environment.prod.ts` files. If you are running the 
app with docker only the `environment.prod.ts` file will be used. For dev configuration edit the `environment.ts`
file. The following configurations are possible:

| config value               | Description                                             | Example (Default value)   |
| -------------------------- | ------------------------------------------------------- |---------------------------|
| mqttHost                   | Sets the host adress of your mqtt broker                | 'localhost'               |
| mqttPort                   | The port your mqtt broker runs on (Websocket port)      | 9001                      |
| heatmapMinData             | The minimum Value of a point on the heatmap             | 0                         |
| heatmapMaxData             | The maximum Value of a point on the heatmap             | 10                        |

### About Heatmap Max and Min
Heatmap Points contain of three values. X coordinate Y coordinate and a value associated with this specific point. Every time the ball 
reaches this position, the value of this coordinate is increased. If your heatmapMaxData is set to 10 for example this coordinate will be coloured 
in deep red after the 10th time the ball reached this position. If the heatmap gets too crowded too fast you will have to increase the heatmapMaxData value
in order to grow the heatmap at a lower pace. 

Conclusion: If you want to have a fast buildup of the heatmap you have to lower the heatmapMaxData Value. If you want the heatmap to populate at a slow
pace over time you have to increase the heatmapMaxData value.

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
