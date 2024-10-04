import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'

import { MessageApiService } from './message-api.service'

describe('MessageApiService', () => {
    let service: MessageApiService

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        })
        service = TestBed.inject(MessageApiService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
