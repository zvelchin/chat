import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'

import { ChatsUsersApiService } from './chats-users-api.service'

describe('ChatsUsersApiService', () => {
    let service: ChatsUsersApiService

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        })
        service = TestBed.inject(ChatsUsersApiService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
