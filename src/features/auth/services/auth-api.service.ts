import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuthUser } from '../interface/IAuthUser';
import { IAuthResponse } from '../interface/IAuthResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {

  http: HttpClient = inject(HttpClient);

  private readonly API_URL: string = 'https://dummyjson.com/auth';

  getAuth(username: string, password: string): Observable<IAuthResponse> {
    const url: string = `${ this.API_URL }/login`;
    return this.http.post<IAuthResponse>(url, { username, password });
  }

  getCurrentUser(): Observable<IAuthUser> {
    const url: string = `${ this.API_URL }/me`;
    return this.http.get<IAuthUser>(url);
  }

  refreshAccessToken(refreshToken: string | null): Observable<IAuthResponse> {
    const url: string = `${ this.API_URL }/refresh`;
    return this.http.post<IAuthResponse>(url, { refreshToken });
  }

}
