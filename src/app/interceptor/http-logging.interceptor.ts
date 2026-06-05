import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

export const httpLoggingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const startTime: number = Date.now();

  return next(req).pipe(
    tap((event: HttpEvent<unknown>) => {
      if (event instanceof HttpResponse) {
        console.log(`${ req.method } ${ req.url } ${ event.status } ${ Date.now() - startTime } мс`);
      }
    }),

    catchError((error: HttpErrorResponse) => {
      console.error(`Ошибка запроса: ${ req.method } ${ req.url } ${ error.status } ${ Date.now() - startTime } мс`);
      return throwError(() => error);
    })
  );
};
