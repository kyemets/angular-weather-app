import { ComponentFixture, TestBed } from '@angular/core/testing'

import { HeatIndexCalculatorComponent } from './heat-index-calculator.component'

describe('HeatIndexCalculatorComponent', () => {
    let component: HeatIndexCalculatorComponent
    let fixture: ComponentFixture<HeatIndexCalculatorComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HeatIndexCalculatorComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(HeatIndexCalculatorComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
