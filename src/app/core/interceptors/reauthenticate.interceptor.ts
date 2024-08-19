import { AuthService } from "./../models/services/spotify/auth.service";
import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, switchMap, throwError } from "rxjs";

export function reauthenticationInterceptor(
  request: HttpRequest<any>,
  next: HttpHandlerFn
) {
  const authService = inject(AuthService);

  const access_token = localStorage.getItem("spotify_token");
  if (access_token) {
    request = request.clone({
      headers: request.headers.set("Authorization", `Basic ${access_token}`),
    });
  }
  return next(request).pipe(
    catchError((error) => {
      if (error.status === 401) {
        if (authService.isTokenExpired()) {
          return authService.refreshAccessToken().pipe(
            switchMap((response) => {
              if (response) {
                localStorage.setItem("spotify_token", response.access_token); //this updates the access token
                request = request.clone({ headers: request.headers.set("Authorization", `Basic ${response.access_token}`) }); //this adds the new access token to the request
                return next(request);
              } else {
                authService.logout(); //if its fails, it will redirect to login page
                return throwError(() => error || "Reauthentication failed");
              }
            })
          );

        } else {
          return throwError(() => error);
        }
      } else {
        return throwError(() => error);
      }
    })
  );
}
export function addAuthorizationHeader(
  req: HttpRequest<any>,
  accessToken: string
): HttpRequest<any> {
  return req.clone({
    setHeaders: {
      Authorization: `Basic ${accessToken}`,
    },
  });
}
