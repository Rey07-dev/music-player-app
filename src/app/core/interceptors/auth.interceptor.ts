import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../models/services/spotify/auth.service";

export function authInterceptor (request: HttpRequest<any>, next: HttpHandlerFn) {

  const token = localStorage.getItem("spotify_token");
  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Basic ${token}`
      }
    })
  }
  return next(request);
}
