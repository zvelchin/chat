import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideMockStore } from '@ngrx/store/testing'

import { LoginComponent } from './login.component'

describe('LoginComponent', () => {
    let component: LoginComponent
    let fixture: ComponentFixture<LoginComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LoginComponent],
            providers: [
                provideAnimations(),
                provideMockStore()
            ]
        })
            .compileComponents()

        fixture = TestBed.createComponent(LoginComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
