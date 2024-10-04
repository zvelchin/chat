import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideNoopAnimations } from '@angular/platform-browser/animations'
import { provideMockStore } from '@ngrx/store/testing'

import { UserInfoComponent } from './user-info.component'

describe('UserInfoComponent', () => {
    let component: UserInfoComponent
    let fixture: ComponentFixture<UserInfoComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UserInfoComponent],
            providers: [
                provideNoopAnimations(),
                provideMockStore()
            ]
        })
            .compileComponents()

        fixture = TestBed.createComponent(UserInfoComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
