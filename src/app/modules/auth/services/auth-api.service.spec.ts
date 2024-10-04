import { HttpClient, provideHttpClient } from '@angular/common/http'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { fakeAsync, TestBed, tick } from '@angular/core/testing'

import { AuthApiService } from './auth-api.service'

describe('AuthApiService', () => {
    let service: AuthApiService
    let httpTesting: HttpTestingController

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        })
        service = TestBed.inject(AuthApiService)
        httpTesting = TestBed.inject(HttpTestingController)
    })


    afterEach(() => {
        // Verify that none of the tests make any extra HTTP requests.
        httpTesting.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy()
    })

    it('not found user throw error', fakeAsync(() => {
        const method = service.loginRequest({ username: 'test', password: '123' })
        method.subscribe({
            error: (err) => {
                expect(err.message.toString()).toEqual('Wrong username or password')
            }
        })
        const req = httpTesting.expectOne({
            method: 'GET',
        })
        req.flush({ body: [] })
    }))

    it('success login return data', (done) => {
        const testUser = {
            id: '1',
            username: 'test',
            is_online: false
        }
        const method = service.loginRequest({ username: testUser.username, password: '123' })
        method.subscribe((value) => {
            expect(value).toEqual({
                accessToken: 'my_token',
                user: testUser
            })
            done()
        })
        const req = httpTesting.expectOne({
            method: 'GET',
        })
        req.flush([ testUser ] )
    })
})
