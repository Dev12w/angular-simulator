import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, Observable, of, switchMap, tap } from 'rxjs';
import { IAuthUser } from '../interfaces/IAuthUser';
import { LocalStorageService } from '../../../app/services/local-storage.service';
import { Router } from '@angular/router';
import { AuthApiService } from './auth-api.service';
import { IToken } from '../interfaces/IToken';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private router: Router = inject(Router);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private authApiService: AuthApiService = inject(AuthApiService);

  private readonly TOKEN_KEY: string = 'token';

  private currentUserSubject: BehaviorSubject<IAuthUser | null> = new BehaviorSubject<IAuthUser | null>(null);
  currentUser$: Observable<IAuthUser | null> = this.currentUserSubject.asObservable();

  setToken(token: string): void {
    this.localStorageService.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return this.localStorageService.getItem(this.TOKEN_KEY);
  }

  setRefreshToken(token: string): void {
    this.localStorageService.setItem(this.TOKEN_KEY, token);
  }

  getRefreshToken(): string | null {
    return this.localStorageService.getItem(this.TOKEN_KEY);
  }

  login(name: string, password: string): Observable<IAuthUser> {
    return this.authApiService.getLogin(name, password).pipe(
      tap((token: IToken) => {
        this.setToken(token.accessToken);
        this.setRefreshToken(token.refreshToken);
      }),
      switchMap((): Observable<IAuthUser> => this.authApiService.getCurrentUser()),
      tap((user: IAuthUser) => this.currentUserSubject.next(user))
    );
  }

  logout(): void {
    this.localStorageService.removeItem(this.TOKEN_KEY);
    this.currentUserSubject.next(null);
    this.router.navigateByUrl('/login');
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  initAuthToken(): Observable<IAuthUser | null> {
    if (!this.getToken()) return of(null);
    return this.authApiService.getCurrentUser()
      .pipe(
        tap((user: IAuthUser) => this.currentUserSubject.next(user)),
        catchError(() => {
          this.logout();
          return of(null);
        })
      );
  }

  refreshToken(): Observable<IToken> {
    const refreshToken: string | null = this.getRefreshToken();
    if (!refreshToken) return EMPTY;
    return this.authApiService.refreshToken(refreshToken)
      .pipe(
        tap((token: IToken) => {
          this.setToken(token.accessToken);
          this.setRefreshToken(token.refreshToken);
        })
      );
  }

}
