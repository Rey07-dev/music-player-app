import { AuthService } from "./../../models/services/auth/auth.service";
import { HttpRequest, HttpHandlerFn, HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, throwError, switchMap } from "rxjs";
import { environment } from "../../../../environments/environment";

export function authInterceptor(
  request: HttpRequest<any>,
  next: HttpHandlerFn
) {
  if (request.url.startsWith(environment.innoBasicUrl)) {
    const access_token = localStorage.getItem("access_token");
    const authService = inject(AuthService);
    const refreshTokenURL = `${environment.innoBasicUrl}/user/refresh-token`;
    let cloneRequest = request

    if (request.url.startsWith(refreshTokenURL)) {
      return next(request);
    }

    cloneRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return next(cloneRequest).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          return authService.refreshToken().pipe(
            switchMap(({ login_token, refresh_token }) => {
              localStorage.setItem("access_token", login_token);
              localStorage.setItem("refresh_token", refresh_token);
              const clonedReq = request.clone({
                headers: request.headers.set(
                  "Authorization",
                  `Bearer ${login_token}`
                ),
              });
              return next(clonedReq);
            }),
            catchError((err) => {
              authService.logout()
              return throwError(() => err);
            })
          )
        }
        return throwError(() => err);
      })
    )
  }
  return next(request)
}
