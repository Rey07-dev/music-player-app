import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../../environments/environment.development";
import { LoginResponse, Signup, RefreshTokenResponse, GetProfile } from "../../interfaces/user/artist";


@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseUrl = environment.innoBasicUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/user/login`, { email, password });
  }

  signup(data: Signup): Observable<{message: string}> {
    return this.http.post<{message: string}>(`${this.baseUrl}/user/signup`, data);
  }

  refreshToken(): Observable<RefreshTokenResponse> {
    const refreshToken = localStorage.getItem("refresh_token");
    return this.http.post<RefreshTokenResponse>(
      `${this.baseUrl}/user/refresh-token`,
      { refresh_token: refreshToken },
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
  }

  logout(){
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("access_token_expiration");
  }

  getProfile(): Observable<GetProfile> {
    return this.http.get<GetProfile>(`${this.baseUrl}/user/profile`);
  }
}
