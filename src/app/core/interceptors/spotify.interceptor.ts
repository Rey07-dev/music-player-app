import { SpotifyAuthService, SpotifyToken } from "../models/services/spotify/spotify-auth.service";
import {
  HttpEvent,
  HttpRequest,
  HttpErrorResponse,
  HttpHandlerFn,
} from "@angular/common/http";
import { inject } from "@angular/core";
import { from, Observable, throwError } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { environment } from "../../../environments/environment.development";

export function spotifyPlayerInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {

  if (req.url.startsWith(environment.playerURL)) {
    const token = localStorage.getItem("spotify_token")!;
    const spotifyAuthService = inject(SpotifyAuthService);
    const clientId = environment.clientId;
    const clientSecret = environment.CLIENT_SECRET;

    const cloneReq = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + token),
    })

    return next(cloneReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return from(spotifyAuthService.refreshAccessToken()).pipe(
            switchMap((newToken) => {
              localStorage.setItem("spotify_token", newToken.access_token);
              localStorage.setItem("spotify_token_expires_in", JSON.stringify(newToken.expires_in));
              localStorage.setItem("spotify_token_type", newToken.token_type);
              localStorage.setItem("spotify_scope", newToken.scope);
              localStorage.setItem("spotify_refresh_token", newToken.refresh_token);
              const newAuthReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken.access_token}`,
                },
              });
              return next(newAuthReq);
            }),
            catchError((err) => {
              spotifyAuthService.logout();
              return throwError(() => err);
            })
          );
        } else if (error.status === 400) {
          const clonedRequest = req.clone({
            setHeaders: {
              Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
              "Content-Type": "application/x-www-form-urlencoded",
            },
          });
          return next(clonedRequest);
        }

        return throwError(() => error);
      })
    );
  }
  return next(req);
}
