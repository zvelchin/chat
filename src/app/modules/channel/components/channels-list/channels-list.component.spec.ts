import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideMockStore } from '@ngrx/store/testing'

import { ChannelsListComponent } from './channels-list.component'

describe('ChannelsListComponent', () => {
    let component: ChannelsListComponent
    let fixture: ComponentFixture<ChannelsListComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChannelsListComponent],
            providers: [
                provideMockStore()
            ]
        })
            .compileComponents()

        fixture = TestBed.createComponent(ChannelsListComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
