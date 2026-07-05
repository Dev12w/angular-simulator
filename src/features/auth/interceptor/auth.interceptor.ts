import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { IAuthResponse } from '../interface/IAuthResponse';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService: AuthService = inject(AuthService);
  const token: string | null = authService.getToken();

  const authReq: HttpRequest<unknown> = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${ token }` } })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401) {
        return throwError(() => error);
      }
      return authService.refreshToken().pipe(
        switchMap((token: IAuthResponse) => {
          const retryReq: HttpRequest<unknown> = req.clone({ setHeaders: { Authorization: `Bearer ${ token.accessToken }` } });
          return next(retryReq);
        }),
        catchError((refreshError: HttpErrorResponse) => {
          authService.logout();
          return throwError(() => refreshError);
        })
      );
    })
  );
};
