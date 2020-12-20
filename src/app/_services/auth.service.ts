import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = ' https://cms-stg-api.foodak.com/api/v1/users/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: { email: string; password: string; }): Observable<any> {
    return this.http.post(AUTH_API + `login`, {
      email: credentials.email,
      password: credentials.password
    }, httpOptions);

  }
}
