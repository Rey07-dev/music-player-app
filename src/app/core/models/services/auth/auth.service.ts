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

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      "X-APN": this.apn,
      "Content-Type": "application/json",
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/user/login`,
      { email, password },
      {
        headers: this.getHeaders(),
      }
    );
  }

  signup(
    data: {email: string,
    first_name: string,
    last_name: string,
    password: string}
  ): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/user/signup`,
      data,
      { headers: this.getHeaders() }
    );
  }

  refreshToken(token: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/user/refresh-token`,
      { refresh_token: token },
      { headers: this.getHeaders() }
    );
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/profile`, { headers: this.getHeaders() });
  }
}
