import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideAnimations } from '@angular/platform-browser/animations'
import { ActivatedRoute } from '@angular/router'
import { provideMockStore } from '@ngrx/store/testing'
import { LoginService } from '../../modules/auth/services/login.service'
import { ChannelUsersService } from '../../modules/channel-participants/services/channel-users.service'
import { UserDataService } from '../../modules/user/services/user-data.service'

import { MainComponent } from './main.component'
import createSpyObj = jasmine.createSpyObj

describe('MainComponent', () => {
    let component: MainComponent
    let fixture: ComponentFixture<MainComponent>
    const mockUserDataService = createSpyObj('UserDataService', ['getChannelUsers', 'loadUserData'])
    const mockLoginService = createSpyObj('LoginService', ['logout'])
    const mockChannelUsersService = createSpyObj('ChannelUsersService', ['addUsersInChannel'])

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MainComponent],
            providers: [
                provideAnimations(),
                provideMockStore(),
                { provide: UserDataService, useValue: mockUserDataService },
                { provide: LoginService, useValue: mockLoginService },
                { provide: ChannelUsersService, useValue: mockChannelUsersService },
                { provide: ActivatedRoute, useValue: { url: '/' } }
            ]
        })
            .compileComponents()

        fixture = TestBed.createComponent(MainComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
