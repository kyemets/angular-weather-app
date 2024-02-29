import { CommonModule } from '@angular/common'
import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnChanges,
    SimpleChanges,
    ViewChild,
} from '@angular/core'
import { Chart } from 'chart.js'

@Component({
    selector: 'app-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.scss'],
    standalone: true,
    imports: [CommonModule],
})
export class LineChartComponent implements AfterViewInit, OnChanges {
    @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>

    @Input() datasets: any[] = []
    @Input() labels: string[] = []
    @Input() lineChartOptions: any = {}
    @Input() lineChartLegend: boolean = true

    private chart?: Chart

    ngAfterViewInit(): void {
        this.createChart()
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (
            changes['datasets'] ||
            changes['labels'] ||
            changes['lineChartOptions']
        ) {
            this.updateChart()
        }
    }

    private createChart(): void {
        if (this.canvas) {
            const ctx = this.canvas.nativeElement.getContext('2d')
            if (ctx) {
                this.chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: this.labels,
                        datasets: this.datasets,
                    },
                    options: this.lineChartOptions,
                })
            } else {
                console.error('Failed to get context from canvas')
            }
        } else {
            console.error('Canvas element not found')
        }
    }

    private updateChart(): void {
        if (this.chart) {
            this.chart.data.labels = this.labels
            this.chart.data.datasets = this.datasets
            this.chart.options = this.lineChartOptions
            this.chart.update()
        }
    }
}
