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

export function spotifyPlayerInterceptor(
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> {
  const token = localStorage.getItem("spotify_token");
  const authService = inject(AuthService);

  let clonedRequest = req.clone({
    headers: req.headers.set("Authorization", `Bearer ${token}`,),
  });;

  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return authService.refreshAccessToken().pipe(
          switchMap((response) => {
            const newToken = response.access_token;
            localStorage.setItem('spotify_token', newToken);
            const newRequest = req.clone({
              headers: req.headers.set("Authorization", `Bearer ${newToken}`),
            });
            return next(newRequest);
          }),
          catchError((refreshError) => {
            console.error('Refresh token failed', refreshError);
            authService.logout();
            return throwError(() => refreshError);
          })
        );
      } else {
        return throwError(() => error);
      }
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
