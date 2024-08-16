import { AuthService } from './../models/services/spotify/auth.service';
import {
  HttpEvent,
  HttpRequest,
  HttpErrorResponse,
  HttpHandlerFn,
} from "@angular/common/http";
import { inject } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { addAuthorizationHeader } from './reauthenticate.interceptor';

export function spotifyPlayerInterceptor(
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> {
  const token = localStorage.getItem("spotify_token");
  const authService = inject(AuthService);

  if (token) {
    req = addAuthorizationHeader(req, token);
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.refreshAccessToken().pipe(
          switchMap((response) => {
            if (response) {
              localStorage.setItem("spotify_token", response.access_token);
              req = addAuthorizationHeader(req, response.access_token);
              handleUnauthorized(req, next, response.access_token);
              return next(req);
            }
            return next(req);
          })
        )
      }
      return throwError(() => new Error(error.message));
    })
  );
}

function handleUnauthorized(
  req: HttpRequest<any>,
  next: HttpHandlerFn, accessToken: string
): Observable<HttpEvent<any>> {
  if (accessToken) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return next(clonedRequest);
  } else {
    return throwError(() => new Error("Unauthorized: Token not found"));
  }
}
