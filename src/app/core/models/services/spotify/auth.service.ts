import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, map, retry, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SpotifyAuthService {
  private clientId = environment.clientId;
  private redirectUri = environment.redirectUri;
  private scopes = environment.scopes;
  private clientSecret = environment.CLIENT_SECRET;
  private authEndpoint = environment.authEndpoint;
  private tokenEndpoint = environment.spotify_Token;

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const params = new HttpParams({
      fromObject: {
        client_id: this.clientId,
        response_type: "code",
        redirect_uri: this.redirectUri,
        scope: this.scopes,
      },
    });
    window.location.href = `${this.authEndpoint}?${params.toString()}`;
  }

  handleAuthCallback(code: string) {
    const body = new HttpParams()
      .set("grant_type", "authorization_code")
      .set("code", code)
      .set("redirect_uri", this.redirectUri);
    this.http
      .post(this.tokenEndpoint, body, {
        headers: {
          Authorization:
            "Basic " + btoa(this.clientId + ":" + this.clientSecret),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .subscribe({
        next: (response: any) => {
          localStorage.setItem("spotify_token", response.access_token);
          localStorage.setItem("spotify_refresh_token", response.refresh_token);
          localStorage.setItem("spotify_token_expiration", response.expires_in);
          this.router.navigate(["/"]);
        },
        error(err) {
          console.error(err);
        },
      });
  }

  refreshAccessToken() {
    const refreshToken = localStorage.getItem("spotify_refresh_token")!;
    if (!refreshToken) {
      return throwError(() => new Error("Refresh token not found"));
    }
    const payload = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + btoa(this.clientId + ":" + this.clientSecret),
      },
      body: new HttpParams()
        .set("grant_type", "refresh_token")
        .set("refresh_token", refreshToken)
        .set("client_id", this.clientId),
    }

    return this.http
      .post(this.tokenEndpoint,payload)
      .pipe(
        map((response: any) => {
          const newAccessToken = response.access_token;
          const newRefreshToken = response.refresh_token;
          localStorage.setItem("spotify_token", newAccessToken);

          if (newRefreshToken) {
            localStorage.setItem("spotify_refresh_token", newRefreshToken);
          }
          return newAccessToken;
        }),
        retry(2),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  isTokenExpired(): boolean {
    const expiration = localStorage.getItem("spotify_token_expiration");
    if (!expiration) {
      return true;
    }
    if (new Date().getTime() > parseInt(expiration, 10)) {
      return true;
    } else {
      return false;
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("spotify_token");
  }

  logout() {
    localStorage.removeItem("spotify_token");
    localStorage.removeItem("spotify_refresh_token");
    localStorage.removeItem("spotify_token_expiration");
    this.router.navigate(["/login"]);
  }
}
