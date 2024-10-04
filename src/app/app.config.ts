import { provideHttpClient } from '@angular/common/http'
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideRouter } from '@angular/router'
import { provideEffects } from '@ngrx/effects'
import { provideStore } from '@ngrx/store'

import { routes } from './app.routes'
import { AuthEffects } from './modules/auth/store/auth.effects'
import { authReducer } from './modules/auth/store/auth.reducer'
import { ChannelEffects } from './modules/channel/store/channel.effects'
import { channelReducer } from './modules/channel/store/channel.reducer'
import { ChatsUsersEffects } from './modules/channel-participants/store/chats-users.effects'
import { chatsUserReducer } from './modules/channel-participants/store/chats-users.reducer'
import { MessageEffects } from './modules/message/store/message.effects'
import { messageReducer } from './modules/message/store/message.reducer'
import { UserEffects } from './modules/user/store/user.effects'
import { userReducer } from './modules/user/store/user.reducer'

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideHttpClient(),
        provideRouter(routes),
        provideStore({
            auth: authReducer,
            user: userReducer,
            channels: channelReducer,
            channelParticipants: chatsUserReducer,
            messages: messageReducer
        }),
        provideEffects([AuthEffects, UserEffects, ChannelEffects, ChatsUsersEffects, MessageEffects]),
        provideAnimationsAsync(),
    ]
}
