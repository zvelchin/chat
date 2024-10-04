import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatDialogRef } from '@angular/material/dialog'
import { provideAnimations } from '@angular/platform-browser/animations'

import { AddChannelDialogComponent } from './add-channel-dialog.component'

describe('AddChannelDialogComponent', () => {
    let component: AddChannelDialogComponent
    let fixture: ComponentFixture<AddChannelDialogComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AddChannelDialogComponent],
            providers: [
                provideAnimations(),
                { provide: MatDialogRef, useValue: { close: (data?: any) => {} }}
            ]
        })
            .compileComponents()

        fixture = TestBed.createComponent(AddChannelDialogComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
