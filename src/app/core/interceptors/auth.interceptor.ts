import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../models/services/spotify/auth.service";

export function authInterceptor (request: HttpRequest<any>, next: HttpHandlerFn) {

  const authService = inject(AuthService);
  const token = authService.getToken();
  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  }
  return next(request);
}
