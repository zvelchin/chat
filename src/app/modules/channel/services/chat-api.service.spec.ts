import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'

import { ChannelApiService } from './channel-api.service'

describe('ChatApiService', () => {
    let service: ChannelApiService

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        })
        service = TestBed.inject(ChannelApiService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
