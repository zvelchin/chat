import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'
import { provideAnimations } from '@angular/platform-browser/animations'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { LoginService } from '../../services/login.service'

import { LoginFormComponent } from './login-form.component'
import createSpyObj = jasmine.createSpyObj

describe('LoginFormComponent', () => {
    let component: LoginFormComponent
    let fixture: ComponentFixture<LoginFormComponent>
    let store: MockStore

    const initialStore = {
        auth: {}
    }

    let loginServiceMock: LoginService = createSpyObj<LoginService>(
        'loginService',
        ['login', 'resetAuthState']
    )

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LoginFormComponent],
            providers: [
                provideAnimations(),
                provideMockStore({ initialState: initialStore }),
                { provide: LoginService, useValue: loginServiceMock }
            ]
        })
            .compileComponents()

        fixture = TestBed.createComponent(LoginFormComponent)
        component = fixture.componentInstance
        store = TestBed.inject(MockStore)
        loginServiceMock = TestBed.inject(LoginService)
        fixture.detectChanges()
    })

    afterEach(async () => {
        component.form.reset()
        fixture.destroy()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('button should be disabled if form invalid', () => {
        fixture.componentInstance.form.setErrors({ test: 'invalid' })
        fixture.detectChanges()
        const button = fixture.nativeElement.querySelector('button')
        expect(button.disabled).toBeTruthy()
    })

    it('update server error', (done) => {
        store.setState({
            auth: { error: 'error' }
        })
        store.refreshState()
        fixture.detectChanges()
        fixture.componentInstance.authError$.subscribe((error) => {
            expect(error).toEqual('error')
            done()
        })
    })

    it('disable form button when server error', (done) => {
        fixture.componentInstance.form.setValue({ username: '123', password: '123' })
        store.setState({
            auth: { error: 'error' }
        })
        store.refreshState()
        fixture.detectChanges()
        fixture.componentInstance.authError$.subscribe(() => {
            const button = fixture.nativeElement.querySelector('button')
            expect(button.disabled).toBeTruthy()
            done()
        })
    })

    it('clear auth error after form change', (done) => {
        fixture.componentInstance.form.setValue({ username: '123', password: '123' })
        store.setState({
            auth: { error: 'error' }
        })
        store.refreshState()
        fixture.detectChanges()
        fixture.componentInstance.form.setValue({ username: '1', password: '1' })
        fixture.detectChanges()
        const button = fixture.nativeElement.querySelector('button')
        expect(button.disabled).toBeFalsy()
        done()
    })

    it('login send if form valid', fakeAsync(() => {
        fixture.componentInstance.form.setValue({ username: '123', password: '123' })
        fixture.detectChanges()
        const button = fixture.nativeElement.querySelector('button')
        button.click()
        tick()
        expect(loginServiceMock.login).toHaveBeenCalled()
    }))

    it('login not send if form empty', fakeAsync(() => {
        component.form.reset()
        const button = fixture.nativeElement.querySelector('button')
        expect(button.disabled).toBeTruthy()
    }))
})
