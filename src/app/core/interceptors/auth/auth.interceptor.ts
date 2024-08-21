import { AuthService } from './../../models/services/auth/auth.service';
import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError, switchMap } from 'rxjs';


export function authInterceptor(request: HttpRequest<any>, next: HttpHandlerFn) {
  const token = localStorage.getItem('token');

  if (token) {
    const cloned = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    });

    return next(cloned).pipe(
      catchError((err) => {
        if (err.status === 401) {
          return handle401Error(cloned, next);
        }
        return throwError(() => err);
      })
    );
  } else {
    return next(request);
  }
}

export function handle401Error(req: HttpRequest<any>, next: HttpHandlerFn) {
  const authService = inject(AuthService);
  const refreshToken = localStorage.getItem('refresh_token');
  if (refreshToken) {
    return authService.refreshToken(refreshToken).pipe(
      switchMap((response: any) => {
        localStorage.setItem('token', response.login_token);
        if (response.refresh_token) {
          localStorage.setItem('refresh_token', response.refresh_token);
        }

        const clonedReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${response.login_token}`)
        });
        return next(clonedReq);
      }),
      catchError((err) => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        return throwError(()=> err);
      })
    );
  } else {
    return throwError(() => 'Refresh token not available');
  }
}
