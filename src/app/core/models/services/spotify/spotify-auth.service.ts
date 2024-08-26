import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment.development";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, map, Observable, retry, throwError } from "rxjs";
import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: 'root',
})
export class SpotifyAuthService {
  private clientId = environment.clientId;
  private redirectUri = environment.redirectUri;
  private scopes = environment.scopes;
  private clientSecret = environment.CLIENT_SECRET;
  private authEndpoint = `${environment.spotifyAuthEndpoint}/authorize`;
  private tokenEndpoint = environment.spotify_Token;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login() {
    const params = new HttpParams({
      fromObject: {
        client_id: this.clientId,
        response_type: 'code',
        redirect_uri: this.redirectUri,
        scope: this.scopes,
      },
    });
    window.location.href = `${this.authEndpoint}?${params.toString()}`;
  }

  handleAuthCallback(code: string) {
    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', code)
      .set('redirect_uri', this.redirectUri);
    this.http
      .post<SpotifyToken>(this.tokenEndpoint, body, {
        headers: {
          Authorization:
            'Basic ' + btoa(this.clientId + ':' + this.clientSecret),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .subscribe({
        next: (response: SpotifyToken) => {
          localStorage.setItem('spotify_token', response.access_token);
          localStorage.setItem('spotify_refresh_token', response.refresh_token);
          localStorage.setItem('spotify_token_expiration', JSON.stringify(response.expires_in));
          localStorage.setItem('spotify_scope', response.scope);
          localStorage.setItem('spotify_token_type', response.token_type);
          this.router.navigate(['/']);
        },
        error(err) {
          console.error(err);
        },
      });
  }

  refreshAccessToken(): Observable<SpotifyToken> {
    const refreshToken = localStorage.getItem('spotify_refresh_token')!;

    if (!refreshToken) {
      return throwError(() => new Error('Refresh token not found'));
    }
    const payload = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(this.clientId + ':' + this.clientSecret),
      },
      body: new HttpParams()
        .set('grant_type', 'refresh_token')
        .set('refresh_token', refreshToken)
        .set('client_id', this.clientId),
    };

    return this.http.post<SpotifyToken>(this.tokenEndpoint, payload).pipe(
      map((response) => {
        const newAccessToken = response.access_token;
        const newRefreshToken = response.refresh_token;
        localStorage.setItem('spotify_token', newAccessToken);

        if (newRefreshToken) {
          localStorage.setItem('spotify_refresh_token', newRefreshToken);
        }
        return response;
      }),
      retry(1),
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }

  isLoggedIn(): boolean {
    return !!(
      localStorage.getItem('spotify_token')// &&
      // localStorage.getItem('access_token')
    );
  }

  logout() {
    localStorage.removeItem('spotify_token');
    localStorage.removeItem('spotify_refresh_token');
    localStorage.removeItem('spotify_token_expiration');
    localStorage.removeItem('spotify_scope');
    localStorage.removeItem('spotify_token_type');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/spotify-login']);
  }
}

export interface SpotifyToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}
