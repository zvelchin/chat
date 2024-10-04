import { AsyncPipe } from '@angular/common'
import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, Input, OnInit } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { MatListItem, MatListItemLine, MatListItemTitle } from '@angular/material/list'
import { BehaviorSubject, filter } from 'rxjs'
import { UserData } from '../../../user/models/user.model'
import { UserApiService } from '../../../user/services/user-api.service'
import { UserDataService } from '../../../user/services/user-data.service'

@Component({
    selector: 'app-message-item',
    standalone: true,
    imports: [
        AsyncPipe,
        MatListItemTitle,
        MatListItemLine,
        MatListItem
    ],
    templateUrl: './message-item.component.html',
    styleUrl: './message-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageItemComponent implements AfterViewInit {
    userName$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null)

    @Input() set userId(id: string) {
        this.initUserGetInfo(id)
    }

    @Input() content!: string
    @Input() isLast: boolean = false

    constructor(
        private userService: UserDataService,
        private destroyRef: DestroyRef,
        private elementRef: ElementRef
    ) {
    }

    ngAfterViewInit(): void {
        if (this.isLast) {
            this.elementRef.nativeElement.scrollIntoView()
        }
    }

    private initUserGetInfo(id: string): void {
        if (!id) {
            return
        }
        this.userService.getUserInfoById(id)
            .pipe(
                filter(Boolean),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe((userData: UserData) => {
                this.userName$.next(userData.username)
            })
    }
}
