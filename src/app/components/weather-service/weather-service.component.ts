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
    forecastData: WeatherData | undefined;

    constructor(private weatherService: WeatherService) {}

    ngOnInit(): void {
      throw new Error('Method not implemented.')
    }

}
