import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { MatTabsModule } from '@angular/material/tabs'
import { WeatherTableComponent } from '../components/weather-table/weather-table.component'
import { LineChartComponent } from '../components/line-chart/line-chart.component'
import { WeatherService } from '../components/weather-service/weather.service'
import { WeatherData } from '../interfaces/WeatherData'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { HeatIndexCalculatorComponent } from '../heat-index-calculator/heat-index-calculator.component'

@Component({
    selector: 'app-my-tabs',
    standalone: true,
    imports: [
        MatTabsModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatPaginator,
        MatSort,
        MatPaginator,
        MatPaginatorModule,
        MatTableModule,
        CommonModule,
        WeatherTableComponent,
        LineChartComponent,
        HeatIndexCalculatorComponent,
    ],
    templateUrl: './my-tabs.component.html',
    styleUrl: './my-tabs.component.scss',
})
export class MyTabsComponent implements OnInit {
    pageSize: number = 5
    @Input() searchText: string = ''
    forecastData: WeatherData | undefined

    displayedColumns: string[] = [
        'datetime',
        'temperature',
        'surfacePressure',
        'relativeHumidity',
    ]
    chartData: { labels: string[]; datasets: any[] } = {
        labels: [],
        datasets: [],
    }
    labels: string[] = []
    lineChartOptions: any = {}
    lineChartLegend: boolean = true
    filteredForecastData: MatTableDataSource<any> = new MatTableDataSource<any>(
        [],
    )

    @ViewChild(MatPaginator) paginator!: MatPaginator
    @ViewChild(MatSort) sort!: MatSort

    constructor(private weatherService: WeatherService) {}

    ngOnInit(): void {
        // TODO: London location
        this.getWeatherForecast(52.52, 13.41)
        this.getHistoricalWeather(52.52, 13.41, '2024-02-13', '2024-02-27')
        this.extractChartData()
    }

    getWeatherForecast(latitude: number, longitude: number): void {
        this.weatherService.getWeatherForecast(latitude, longitude).subscribe(
            (data: WeatherData) => {
                this.forecastData = data
                if (this.forecastData) {
                    this.filteredForecastData.data =
                        this.forecastData.hourly.time.map((time, index) => ({
                            datetime: time,
                            temperature:
                                this.forecastData?.hourly.temperature_2m[
                                    index
                                ] ?? null,
                            // weatherState: this.forecastData?.weather
                            surfacePressure:
                                this.forecastData?.hourly.surface_pressure[
                                    index
                                ] ?? null,
                            relativeHumidity:
                                this.forecastData?.current
                                    .relative_humidity_2m ?? null,
                        }))
                    this.filteredForecastData.paginator = this.paginator
                    this.filteredForecastData.sort = this.sort
                } else {
                    this.filteredForecastData.data = []
                }
            },
            (error: any) => {
                console.error('Error fetching weather forecast:', error)
            },
        )
    }

    // TODO: add this
    getHistoricalWeather(
        latitude: number,
        longitude: number,
        startDate: string,
        endDate: string,
    ) {
        this.weatherService
            .getHistoricalWeather(latitude, longitude, startDate, endDate)
            .subscribe(
                (data: WeatherData) => {
                    // ...
                },
                (error: any) => {
                    console.error(
                        'Error fetching historical weather forecast:',
                        error,
                    )
                },
            )
    }

    pageChanged(event: any): void {
        const startIndex = event.pageIndex * event.pageSize
        const endIndex = startIndex + event.pageSize
        if (this.forecastData?.hourly) {
            const data = this.forecastData.hourly.time
                .slice(startIndex, endIndex)
                .map((time, index) => ({
                    datetime: time,
                    temperature:
                        this.forecastData?.hourly.temperature_2m[
                            startIndex + index
                        ] ?? null,
                    surfacePressure:
                        this.forecastData?.hourly.surface_pressure[
                            startIndex + index
                        ] ?? null,
                    relativeHumidity:
                        this.forecastData?.current.relative_humidity_2m ?? null,
                }))
            this.filteredForecastData.data = data
        } else {
            this.filteredForecastData.data = []
        }
    }

    extractChartData(): void {
        if (this.forecastData && this.forecastData.hourly) {
            this.labels = this.forecastData.hourly.time.map((time: any) =>
                new Date(time).toLocaleString(),
            )
            const temperatureData = this.forecastData.hourly.temperature_2m
            this.chartData = {
                labels: this.labels,
                datasets: [
                    {
                        data: temperatureData,
                        label: 'Temperature (°C)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        fill: false,
                    },
                ],
            }
            this.lineChartOptions = {
                responsive: true,
                legend: {
                    display: this.lineChartLegend,
                },
            }
        }
    }
}
