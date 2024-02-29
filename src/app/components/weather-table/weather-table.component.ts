import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { WeatherService } from '../weather-service/weather.service'
import { WeatherData } from '../../interfaces/WeatherData'
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { CommonModule } from '@angular/common'
import { MatTableModule } from '@angular/material/table'
import { FormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { LineChartComponent } from '../line-chart/line-chart.component'
import { londonCoordinates } from '../../../../config'

@Component({
    selector: 'app-weather-table',
    templateUrl: './weather-table.component.html',
    styleUrls: ['./weather-table.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatPaginator,
        MatSort,
        MatPaginator,
        MatPaginatorModule,
        MatTableModule,
        LineChartComponent,
    ],
})
export class WeatherTableComponent implements OnInit {
    pageSize: number = 5
    @Input() searchText: string = ''
    forecastData: WeatherData | undefined
    filteredForecastData: MatTableDataSource<any> = new MatTableDataSource<any>(
        [],
    )
    displayedColumns: string[] = [
        'datetime',
        'temperature',
        'historicalWeather',
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
    historicalData: WeatherData | undefined;

    @ViewChild(MatPaginator) paginator!: MatPaginator
    @ViewChild(MatSort) sort!: MatSort

    constructor(private weatherService: WeatherService) {}

    ngOnInit(): void {
        this.getWeatherForecast(londonCoordinates.latitude, londonCoordinates.longitude)
        this.getHistoricalWeather(londonCoordinates.latitude, londonCoordinates.longitude, '2024-02-13', '2024-02-27')
        this.extractChartData()
    }

    ngAfterViewInit(): void {
        if (this.paginator) {
            this.filteredForecastData.paginator = this.paginator
            this.filteredForecastData.paginator.pageSize = this.pageSize
        } else {
            console.log('')
        }
    }

    getWeatherForecast(latitude: number, longitude: number): void {
        this.weatherService.getWeatherForecast(latitude, longitude).subscribe(
            (data: WeatherData) => {
                this.forecastData = data;
                this.updateFilteredData();
            },
            (error: any) => {
                console.error('Error fetching weather forecast:', error);
            },
        );
    }

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
                    this.historicalData = data;
                    this.updateFilteredData();
                },
                (error: any) => {
                    console.error('Error fetching historical weather forecast:', error);
                },
            );
    }

    updateFilteredData(): void {
      if (this.forecastData && this.forecastData.hourly && this.historicalData && this.historicalData.hourly) {
          const combinedData = this.forecastData.hourly.time.map((time, index) => ({
              datetime: time,
              temperature: this.forecastData?.hourly.temperature_2m[index] ?? null,
              historicalWeather: this.historicalData?.hourly.temperature_2m[index] ?? null,
              surfacePressure: this.forecastData?.hourly.surface_pressure[index] ?? null,
              relativeHumidity: this.forecastData?.current.relative_humidity_2m ?? null,
          }));

          this.filteredForecastData.data = combinedData;
      } else {
          this.filteredForecastData.data = [];
      }
  }

  pageChanged(event: any): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    if (this.forecastData?.hourly && this.historicalData?.hourly) {
        const data = this.forecastData.hourly.time
            .slice(startIndex, endIndex)
            .map((time, index) => ({
                datetime: time,
                temperature: this.forecastData?.hourly.temperature_2m[startIndex + index] ?? null,
                historicalWeather: this.historicalData?.hourly.temperature_2m[startIndex + index] ?? null,
                surfacePressure: this.forecastData?.hourly.surface_pressure[startIndex + index] ?? null,
                relativeHumidity: this.forecastData?.current.relative_humidity_2m ?? null,
            }));
        this.filteredForecastData.data = data;
    } else {
        this.filteredForecastData.data = [];
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
