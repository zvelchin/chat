import { provideHttpClient } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { provideMockStore } from '@ngrx/store/testing'

import { ChannelUsersService } from './channel-users.service'

describe('ChannelUsersService', () => {
    let service: ChannelUsersService

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(),
                provideMockStore()
            ]
        })
        service = TestBed.inject(ChannelUsersService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
