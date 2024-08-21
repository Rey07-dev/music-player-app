import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private clientId = environment.clientId;
  private redirectUri = environment.redirectUri;
  private scopes = environment.scopes;
  private clientSecret = environment.CLIENT_SECRET;
  private authEndpoint = environment.authEndpoint;
  private tokenEndpoint = environment.spotify_Token;
  private accessToken: string | null = null;

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
          this.setAccessToken(response.access_token);
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

  getToken() {
    return this.accessToken;
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  refreshAccessToken() {
    const refreshToken = localStorage.getItem("spotify_refresh_token")!;
    const body = new URLSearchParams();
    body.set("grant_type", "refresh_token");
    body.set("refresh_token", refreshToken);
    body.set("client_id", this.clientId);

    return this.http.post<any>((this.tokenEndpoint, body.toString()), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(this.clientId + ":" + this.clientSecret),
      },
    });
  }

  isTokenExpired(): boolean {
    const expiration = localStorage.getItem("spotify_token_expiration");
    if (!expiration) {
      return true;
    }
    return new Date().getTime() > parseInt(expiration, 10);
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
