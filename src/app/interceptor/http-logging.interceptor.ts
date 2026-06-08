import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

export const httpLoggingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const startTime: number = Date.now();

  const logMessages = (status: number, isError: boolean = false ): void => {
    const message: string = `${ req.method } ${ req.url } ${ status } ${ Date.now() - startTime } мс`;
    isError ? console.error(`Ошибка запроса: ${ message }`) : console.log(message);
  };

  return next(req).pipe(
    tap((event: HttpEvent<unknown>) => {
      if (event instanceof HttpResponse) {
        logMessages(event.status);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      logMessages(error.status, true);
      return throwError(() => error);
    })
  );
};
