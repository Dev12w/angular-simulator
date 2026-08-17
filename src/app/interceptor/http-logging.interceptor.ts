import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { APP_CONFIG } from '../tokens/app-config.token';
import { inject } from '@angular/core';
import { IAppConfig } from '../interfaces/IAppConfig';

export const httpLoggingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const config: IAppConfig = inject(APP_CONFIG);

  const startTime: number = Date.now();

  if (!config.enableLogs) return next(req);

  const logMessage = (status: number, isError: boolean = false): void => {
    const message: string = `${ req.method } ${ req.url } ${ status } ${ Date.now() - startTime } мс`;
    return isError ? console.error(`Ошибка запроса: ${ message }`) : console.warn(message);
  };

  return next(req).pipe(
    tap((event: HttpEvent<unknown>) => {
      if (event instanceof HttpResponse) {
        logMessage(event.status);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      logMessage(error.status, true);
      return throwError(() => error);
    }),
  );
};
