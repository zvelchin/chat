import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { MessageData } from '../models/message.model'

@Injectable({
    providedIn: 'root'
})
export class MessageApiService {

    constructor(
        private http: HttpClient
    ) {
    }

    sendMessage(data: Omit<MessageData, 'id'>): Observable<any> {
        return this.http.post('/api/messages', {
            ...data
        })
    }

    getMessagesRequest(channelId: string): Observable<MessageData[]> {
        return this.http.get<MessageData[]>(`/api/messages?channel_id=${channelId}`)
    }
}
