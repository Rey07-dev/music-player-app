import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../../environments/environment";

interface Signup {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseUrl = environment.innoBasicUrl;
  private apn = environment.xAPN;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/login`, { email, password });
  }

  signup(data: {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/signup`, data);
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem("inno_refresh_token");
    return this.http.post(
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
    localStorage.removeItem("inno_refresh_token");
    localStorage.removeItem("inno_access_token");
    localStorage.removeItem("access_token_expiration");
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/profile`);
  }
}
