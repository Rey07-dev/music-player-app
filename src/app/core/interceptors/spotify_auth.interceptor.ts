import { HttpHandlerFn, HttpRequest } from "@angular/common/http";

export function spotifyAuthInterceptor (request: HttpRequest<any>, next: HttpHandlerFn) {

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
