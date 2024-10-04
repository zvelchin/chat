import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing'
import { MatDialogRef } from '@angular/material/dialog'
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideMockStore } from '@ngrx/store/testing'
import { of } from 'rxjs'
import { ChannelUsersService } from '../../services/channel-users.service'

import { AddUserToChannelDialogComponent } from './add-user-to-channel-dialog.component'

describe('AddUserToChannelDialogComponent', () => {
    let component: AddUserToChannelDialogComponent
    let fixture: ComponentFixture<AddUserToChannelDialogComponent>
    const initialStore = {
        channels: {}
    }
    const channelUserServiceMock = {
        getUsersToAddInChannels: () => of([])
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AddUserToChannelDialogComponent],
            providers: [
                provideAnimations(),
                provideMockStore({ initialState: initialStore }),
                { provide: ChannelUsersService, useValue: channelUserServiceMock},
                { provide: MatDialogRef, useValue: {}}
            ]
        })
            .compileComponents()

        fixture = TestBed.createComponent(AddUserToChannelDialogComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', fakeAsync(() => {
        const serviceSpy = spyOn(channelUserServiceMock, 'getUsersToAddInChannels')
        serviceSpy.and.returnValue(of([]))
        expect(component).toBeTruthy()
    }))
})
