import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from '../../user/models/user.model';
import { LoginFormData, TokenData } from '../models/login.model';
import { filter, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private http: HttpClient) {}

  loginRequest({ username, password }: LoginFormData): Observable<TokenData> {
    const cryptedPassword = password
      .split('')
      .map((item) => item.charCodeAt(0) ^ 1)
      .join('');
    return this.http
      .get<UserData[]>(
        `/api/users?username=${username}&password=${cryptedPassword}`
      )
      .pipe(
        tap((info: UserData[]) => {
          if (!info.length) {
            throw new Error('Wrong username or password');
          }
        }),
        filter((info: UserData[]) => Boolean(info.length)),
        map(([info]: UserData[]) => {
          return {
            accessToken: 'my_token',
            user: {
              id: info.id,
              username: info.username,
              is_online: info.is_online,
            },
          };
        })
      );
  }
}
