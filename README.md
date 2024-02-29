# WeatherApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.1.


This application fetches and displays weather forecast information for London in various ways, including historical data. It provides three tabs:

1. **Weather Data Table**: Displays hourly weather forecast for the next few days and hourly historical weather conditions (e.g., last 1 week) for London. The table includes columns such as 'Datetime', 'Weather State', 'Temperature', 'Surface Pressure', 'Relative Humidity', etc.

2. **Temperature vs. Time Line Chart**: Shows the relationship between time (x-axis) and temperature (y-axis) based on the data in the first tab.

3. **Heat Index Calculator**: Allows users to calculate the Heat Index based on temperature and relative humidity inputs. The calculator supports temperature input in both Celsius (°C) and Fahrenheit (°F) and provides the result in the selected unit.

## Requirements

- **UI Framework**: Angular
- **Design Framework**: Material Design
- **REST APIs**: Utilizes APIs from [Open Meteo](https://open-meteo.com/en/docs)
- **Heat Index Formula**: Implements the formula from [weather.gov](https://www.weather.gov/media/epz/wxcalc/heatIndex.pdf)


## Installation

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd weather-app`
3. Install dependencies: `npm install`

## Usage

1. Start the development server: `npm start`
2. Open your browser and navigate to `http://localhost:4200/`

## Scripts

- **start**: Starts the development server
- **build**: Builds the application
- **watch**: Builds the application in watch mode
- **test**: Runs unit tests
- **serve:ssr:weather-app**: Serves the application with server-side rendering
- **format**: Formats source files using Prettier

## Dependencies

- Angular
- Angular Material
- Chart.js
- Express
- Open Meteo API
- RxJS

## Dev Dependencies

- Angular CLI
- Jasmine
- Karma
- Prettier
- TypeScript


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


---



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

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
