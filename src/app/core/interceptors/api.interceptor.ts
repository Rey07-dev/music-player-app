import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse, HttpHandlerFn } from '@angular/common/http';
import { catchError, debounceTime, Observable, tap, throwError } from 'rxjs';

// @Injectable()

export function apiInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  console.log(req.url);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      return throwError(() => { error });
    })
  );
}
