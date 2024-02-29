import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { WeatherData } from '../../interfaces/WeatherData'

@Injectable({
    providedIn: 'root',
})
export class WeatherService {
    private apiUrl = 'https://api.open-meteo.com/v1/forecast'

    constructor(private http: HttpClient) {}

    getWeatherForecast(
        latitude: number,
        longitude: number,
    ): Observable<WeatherData> {
        const params = {
            latitude: latitude,
            longitude: longitude,
            current: 'relative_humidity_2m',
            hourly: ['temperature_2m', 'surface_pressure'],
        }

        return this.http.get<WeatherData>(this.apiUrl, { params }).pipe(
            map((response: any) => {
                return response as WeatherData
            }),
        )
    }

    // last week
    getHistoricalWeather(
      latitude: number,
      longitude: number,
      startDate: string,
      endDate: string
  ): Observable<WeatherData> {
      const params = {
          latitude: latitude,
          longitude: longitude,
          start_date: startDate,
          end_date: endDate,
          current: 'relative_humidity_2m',
          hourly: ['temperature_2m', 'relative_humidity_2m'],
      }

      return this.http.get<WeatherData>(this.apiUrl, { params }).pipe(
        map((response: any) => {
            return response as WeatherData
        }),
    )}
}
