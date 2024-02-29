import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { WeatherServiceComponent } from './components/weather-service/weather-service.component'
import { WeatherTableComponent } from './components/weather-table/weather-table.component'
import { HttpClientModule } from '@angular/common/http'
import { NgChartsModule } from 'ng2-charts'
import { LineChartComponent } from './components/line-chart/line-chart.component'
import { HeatIndexCalculatorComponent } from './heat-index-calculator/heat-index-calculator.component'
import { MatPaginatorModule } from '@angular/material/paginator'
import { HostBinding } from '@angular/core'
import { MyToolbarComponent } from './my-toolbar/my-toolbar.component'
import { MyTabsComponent } from './my-tabs/my-tabs.component'

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        HttpClientModule,
        RouterOutlet,
        MyTabsComponent,
        MyToolbarComponent,
        WeatherServiceComponent,
        WeatherTableComponent,
        HeatIndexCalculatorComponent,
        NgChartsModule,
        LineChartComponent,
        NgChartsModule,
        MatPaginatorModule,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'weather-app'
    darkMode: boolean = false

    @HostBinding('class') get themeMode() {
        return this.darkMode ? 'theme-dark' : 'theme-light'
    }

    toggleDarkMode() {
        this.darkMode = !this.darkMode
    }
}
