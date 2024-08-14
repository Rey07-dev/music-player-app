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
  private authEndpoint = 'https://accounts.spotify.com/authorize';
  private tokenEndpoint = 'https://accounts.spotify.com/api/token'


  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const scopes = 'user-library-read user-top-read playlist-read-private';
    const params = new HttpParams({
      fromObject: {
        client_id: this.clientId,
        response_type: 'code',
        redirect_uri: this.redirectUri,
        scope: scopes,
      },
    });

    window.location.href = `${this.authEndpoint}?${params.toString()}`;
  }

  handleAuthCallback(code: string) {
    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', code)
      .set('redirect_uri', this.redirectUri)
      .set('client_id', this.clientId)
      .set('client_secret', this.clientSecret);

    this.http.post(this.tokenEndpoint, body, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).subscribe((response: any) => {
      localStorage.setItem('spotify_token', response.access_token);
      this.router.navigate(['/']);
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('spotify_token');
  }

  logout() {
    localStorage.removeItem('spotify_token');
    this.router.navigate(['/login']);
  }

  // getSpotifyAuthUrl() {
  //   const authEndpoint = environment.authEndpoint;
  //   return `${authEndpoint}?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=${this.scopes}&response_type=token&show_dialog=true`;
  // }

  // handleRedirectCallback() {
  //   const hash = window.location.hash
  //     .substring(1)
  //     .split("&")
  //     .reduce((acc, item) => {
  //       const parts = item.split("=");
  //       console.log("parts", parts, 'item', item, 'acc', acc);
  //       // acc[parts[0]] = decodeURIComponent(parts[1]);
  //       return acc;
  //     }, {});

  //   window.location.hash = "";
  //   return hash;
  // }
}
