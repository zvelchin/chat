import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatDialog } from '@angular/material/dialog'
import { provideMockStore } from '@ngrx/store/testing'
import { ChannelUsersService } from '../../services/channel-users.service'

import { ChannelParticipantsComponent } from './channel-participants.component'
import createSpyObj = jasmine.createSpyObj

describe('ChannelParticipantsComponent', () => {
    let component: ChannelParticipantsComponent
    let fixture: ComponentFixture<ChannelParticipantsComponent>
    const mockChannelUsersService = createSpyObj('ChannelUsersService', ['addUsersInChannel'])

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChannelParticipantsComponent],
            providers: [
                provideMockStore(),
                { provide: ChannelUsersService, useValue: mockChannelUsersService }
            ]
        })
            .compileComponents()

        fixture = TestBed.createComponent(ChannelParticipantsComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
