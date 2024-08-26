import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { environment } from "../../../environments/environment.development";

export function spotifyAuthInterceptor (request: HttpRequest<unknown>, next: HttpHandlerFn) {

  if (request.url.startsWith(environment.playerURL)) {
    const token = localStorage.getItem("spotify_token");
    const spotifyTokenType = localStorage.getItem("spotify_token_type");
    if (token && spotifyTokenType) {
      const cloneRequest = request.clone({
        setHeaders: {
          Authorization: `${spotifyTokenType} ${token}`
        }
      })
      return next(cloneRequest);
    }
  }
  return next(request);
}
