import { provideLocationMocks } from '@angular/common/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute } from '@angular/router'
import { provideMockStore } from '@ngrx/store/testing'

import { MainHeaderComponent } from './main-header.component'

describe('MainHeaderComponent', () => {
    let component: MainHeaderComponent
    let fixture: ComponentFixture<MainHeaderComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MainHeaderComponent],
            providers: [
                provideMockStore(),
                provideLocationMocks(),
                { provide: ActivatedRoute, useValue: { url: '/' } }
            ]
        })
            .compileComponents()

        fixture = TestBed.createComponent(MainHeaderComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
