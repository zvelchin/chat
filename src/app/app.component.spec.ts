import { TestBed } from '@angular/core/testing'
import { provideMockStore } from '@ngrx/store/testing'
import { AppComponent } from './app.component'
import { AppService } from './core/services/app.service'
import { UserDataService } from './modules/user/services/user-data.service'

describe('AppComponent', () => {
    const storeInitState = {
        user: {}
    }
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppComponent],
            providers: [
                AppService,
                UserDataService,
                provideMockStore({ initialState: storeInitState })
            ]
        }).compileComponents()
    })

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent)
        const app = fixture.componentInstance
        expect(app).toBeTruthy()
    })
})
