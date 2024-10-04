import { TestBed } from '@angular/core/testing'
import { provideMockStore } from '@ngrx/store/testing'

import { ChannelDataService } from './channel-data.service'

describe('ChatDataService', () => {
    let service: ChannelDataService

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideMockStore()
            ]
        })
        service = TestBed.inject(ChannelDataService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
