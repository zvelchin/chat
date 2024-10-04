import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideAnimations } from '@angular/platform-browser/animations'

import { MessageInputComponent } from './message-input.component'

describe('MessageInputComponent', () => {
    let component: MessageInputComponent
    let fixture: ComponentFixture<MessageInputComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MessageInputComponent],
            providers: [
                provideAnimations()
            ]
        })
            .compileComponents()

        fixture = TestBed.createComponent(MessageInputComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
