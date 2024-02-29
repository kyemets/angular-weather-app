import { Component, OnInit } from '@angular/core'
import { WeatherService } from './weather.service'
import { WeatherData } from '../../interfaces/WeatherData'
import { CommonModule } from '@angular/common'

@Component({
    selector: 'app-weather-service',
    templateUrl: './weather-service.component.html',
    styleUrls: ['./weather-service.component.scss'],
    standalone: true,
    imports: [CommonModule],
})
export class WeatherServiceComponent implements OnInit {
    forecastData: WeatherData | undefined // Используем тип WeatherData для описания данных прогноза погоды

    constructor(private weatherService: WeatherService) {}

    ngOnInit(): void {
        this.getWeatherForecast(52.52, 13.419998)
        this.getHistoricalWeather(52.52, 13.41999, '2024-02-13', '2024-02-27')
    }

    getWeatherForecast(latitude: number, longitude: number): void {
        this.weatherService.getWeatherForecast(latitude, longitude).subscribe(
            (data: WeatherData) => {
                this.forecastData = data
                console.log('getWeatherForecast')
                console.log(this.forecastData)
            },
            (error) => {
                console.error('Error:', error)
            },
        )
    }

    getHistoricalWeather(latitude: number, longitude: number, startDate: string, endDate: string): void {
      this.weatherService.getHistoricalWeather(latitude, longitude, startDate, endDate).subscribe(
          (data: WeatherData) => {
              this.forecastData = data
              console.log('getHistoricalWeather')
              console.log(this.forecastData)
          },
          (error) => {
              console.error('Error:', error)
          },
      )
  }
}
