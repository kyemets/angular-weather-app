import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatDividerModule } from '@angular/material/divider'
@Component({
    selector: 'app-heat-index-calculator',
    templateUrl: './heat-index-calculator.component.html',
    styleUrls: ['./heat-index-calculator.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatCardModule,
    ],
})
export class HeatIndexCalculatorComponent {
    temperature: number = 0
    temperatureUnit: string = 'C' // default to celsius
    relativeHumidity: number = 0
    heatIndex: number | undefined = undefined

    myControl = new FormControl('')
    options: string[] = ['F', 'C']

    calculateHeatIndex(): void {
        if (this.temperatureUnit === 'C') {
            this.heatIndex = this.calculateHeatIndexCelsius(
                this.temperature,
                this.relativeHumidity,
            )
        } else {
            const temperatureFahrenheit = this.temperature
            this.heatIndex = this.calculateHeatIndexFahrenheit(
                temperatureFahrenheit,
                this.relativeHumidity,
            )
        }
    }

    calculateHeatIndexFahrenheit(
        temperatureFahrenheit: number,
        relativeHumidity: number,
    ): number {
        const T = temperatureFahrenheit
        const RH = relativeHumidity

        const heatIndexFahrenheit =
            -42.379 +
            2.04901523 * T +
            10.14333127 * RH -
            0.22475541 * T * RH -
            6.83783e-3 * T * T -
            5.481717e-2 * RH * RH +
            1.22874e-3 * T * T * RH +
            8.5282e-4 * T * RH * RH -
            1.99e-6 * T * T * RH * RH

        return heatIndexFahrenheit
    }

    calculateHeatIndexCelsius(
        temperatureCelsius: number,
        relativeHumidity: number,
    ): number {
        const temperatureFahrenheit = (temperatureCelsius * 9) / 5 + 32
        const heatIndexFahrenheit = this.calculateHeatIndexFahrenheit(
            temperatureFahrenheit,
            relativeHumidity,
        )
        const heatIndexCelsius = ((heatIndexFahrenheit - 32) * 5) / 9
        return heatIndexCelsius
    }
}
