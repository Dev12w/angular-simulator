import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuthUser } from '../interface/IAuthUser';
import { ITokenResponse } from '../interface/ITokenResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {

  http: HttpClient = inject(HttpClient);

  private readonly API_URL: string = 'https://dummyjson.com/auth';

  getLogin(username: string, password: string): Observable<ITokenResponse> {
    const url: string = `${ this.API_URL }/login`;
    return this.http.post<ITokenResponse>(url, { username, password });
  }

  getCurrentUser(): Observable<IAuthUser> {
    const url: string = `${ this.API_URL }/me`;
    return this.http.get<IAuthUser>(url);
  }

  refreshToken(refreshToken: string): Observable<ITokenResponse> {
    const url: string = `${ this.API_URL }/refresh`;
    return this.http.post<ITokenResponse>(url, { refreshToken });
  }

}
