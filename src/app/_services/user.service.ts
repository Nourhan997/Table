import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = "https://cms-stg-api.foodak.com/api/v1/";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }
  getusersById(): Observable<any>
  {
    return this.http.get(`${AUTH_API}homepage/sections/listing`, { responseType: "json" });
  }

  CustomerListing(data: any): Observable<any> 
  {
    return this.http.post(`${AUTH_API}customers/listing`, data)
  }

}
