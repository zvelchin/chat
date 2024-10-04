import { TestBed } from '@angular/core/testing'
import { provideMockStore } from '@ngrx/store/testing'

import { UserDataService } from './user-data.service'

describe('UserDataService', () => {
    let service: UserDataService

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideMockStore()
            ]
        })
        service = TestBed.inject(UserDataService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
