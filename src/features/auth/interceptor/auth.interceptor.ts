import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { ITokenResponse } from '../interface/ITokenResponse';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService: AuthService = inject(AuthService);
  const token: string | null = authService.getToken();

  const addHeaderToken = (request: HttpRequest<unknown>, token: string): HttpRequest<unknown> => {
    return request.clone({ setHeaders: { Authorization: `Bearer ${ token }` } });
  };

  const authReq: HttpRequest<unknown> = token
    ? addHeaderToken(req, token)
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401) {
        return throwError(() => error);
      }
      return authService.refreshToken().pipe(
        switchMap((token: ITokenResponse) => {
          return next(addHeaderToken(req, token.accessToken));
        }),
        catchError((refreshError: HttpErrorResponse) => {
          authService.logout();
          return throwError(() => refreshError);
        })
      );
    })
  );
};
