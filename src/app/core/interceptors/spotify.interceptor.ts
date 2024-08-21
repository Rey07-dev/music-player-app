import { SpotifyAuthService } from "./../models/services/spotify/auth.service";
import {
  HttpEvent,
  HttpRequest,
  HttpErrorResponse,
  HttpHandlerFn,
} from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { environment } from "../../../environments/environment";

export function spotifyPlayerInterceptor(
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> {
  const token = localStorage.getItem("spotify_token");
  const spotifyAuthService = inject(SpotifyAuthService);
  const clientId = environment.clientId;
  const clientSecret = environment.CLIENT_SECRET;

  let clonedRequest = req.clone({
    headers: req.headers.set("Authorization", `Bearer ${token}`),
  });

  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return spotifyAuthService.refreshAccessToken().pipe(
          switchMap((response) => {
            const newToken = response.access_token;
            localStorage.setItem("spotify_token", newToken);
            const newRequest = req.clone({
              headers: req.headers.set("Authorization", `Bearer ${newToken}`),
            });
            return next(newRequest);
          }),
          catchError((refreshError) => {
            spotifyAuthService.logout();
            return throwError(() => refreshError);
          })
        );
      } else if (error.status === 400) {
        return handleUnauthorized(req, next, clientId, clientSecret);
      } else {
        return throwError(() => error);
      }
    })
  );
}

function handleUnauthorized(
  req: HttpRequest<any>,
  next: HttpHandlerFn,
  clientId: string,
  clientSecret: string
): Observable<HttpEvent<any>> {
  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return next(clonedRequest);
}
