import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideAnimations } from '@angular/platform-browser/animations'
import { ActivatedRoute } from '@angular/router'
import { provideMockStore } from '@ngrx/store/testing'

import { UserSettingsComponent } from './user-settings.component'

describe('UserSettingsComponent', () => {
    let component: UserSettingsComponent
    let fixture: ComponentFixture<UserSettingsComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UserSettingsComponent],
            providers: [
                provideAnimations(),
                provideMockStore(),
                { provide: ActivatedRoute, useValue: { url: '/' } }
            ]
        })
            .compileComponents()

        fixture = TestBed.createComponent(UserSettingsComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
