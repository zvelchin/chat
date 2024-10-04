import { TestBed } from '@angular/core/testing'
import { provideMockStore } from '@ngrx/store/testing'

import { LoginService } from './login.service'

describe('LoginService', () => {
    let service: LoginService

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: provideMockStore()
        })
        service = TestBed.inject(LoginService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
