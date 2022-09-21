import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        // if (event && event.status && event.status !== 200)
        if (event instanceof HttpResponse) {
          console.log(event);
        }

        return event;
      }),
      catchError(({ error }: HttpErrorResponse)  => {
        alert('Server is down! Try again later!..');

        return throwError(of(error));
      })
    );
  }
}
