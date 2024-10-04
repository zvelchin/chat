import { TestBed } from '@angular/core/testing'
import { MockStore, provideMockStore } from '@ngrx/store/testing'

import { AppService } from './app.service'
import { LocalStorageService } from './local-storage.service'
import createSpyObj = jasmine.createSpyObj

describe('AppService', () => {
    let service: AppService
    let store: MockStore

    let lsService = createSpyObj<LocalStorageService>(
        'LocalStorageService', ['getItem']
    )

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: LocalStorageService, useValue: lsService },
                provideMockStore()
            ]
        })
        service = TestBed.inject(AppService)
        store = TestBed.inject(MockStore)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })

    it('should not update store', () => {
        const storeSpy = spyOn(store, 'dispatch')
        lsService.getItem.and.returnValue(null)
        service.initAuthData()
        expect(storeSpy).not.toHaveBeenCalled()
    })

    it('should update store', () => {
        const storeSpy = spyOn(store, 'dispatch').and.callThrough()
        lsService.getItem.and.returnValue({ accessToken: '123' })
        service.initAuthData()
        expect(storeSpy).toHaveBeenCalled()
    })
})
