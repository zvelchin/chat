import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { forkJoin, Observable, of, switchMap } from 'rxjs'
import { ChannelUserRel } from '../../channel/models/channel.model'
import { UserData } from '../../user/models/user.model'
import { UserApiService } from '../../user/services/user-api.service'

@Injectable({
    providedIn: 'root'
})
export class ChatsUsersApiService {

    constructor(
        private http: HttpClient,
        private userApiService: UserApiService
    ) {
    }

    getAllUsers(excludeIds?: string[]): Observable<UserData[]> {
        const excludeFilter = excludeIds?.map(id => `id_ne=${id}`).join('&')
        return this.http.get<UserData[]>(`/api/users?${excludeFilter}`)
    }

    getChannelsUsers(channelId: string): Observable<UserData[]> {
        return this.http.get<ChannelUserRel[]>(`/api/user_channels?channel_id=${channelId}`)
            .pipe(
                switchMap((rels: ChannelUserRel[]) => {
                    return this.userApiService.getUsersDataRequest(rels.map(rel => rel.user_id))
                })
            )
    }

    addUserToChannelRequest(channelId: string, userIds: string[]): Observable<null> {
        return forkJoin([
            ...userIds.map((id) =>
                this.http.post<void>('/api/user_channels', { channel_id: channelId, user_id: id })
            )
        ]).pipe(
            switchMap(() => of(null))
        )
    }
}
