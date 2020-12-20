import { HTTP_INTERCEPTORS, HttpEvent, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from '../_services/token-storage.service';
import { Observable } from 'rxjs/observable';

const TOKEN_HEADER_KEY = 'Authorization';
// or Spring Boot back-end
//Add Authorization header with ‘Bearer’ prefix to the token.


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headersObj: any = {};

    // Keeps the original request params. as a new HttpParams
    let newParams = new HttpParams({ fromString: req.params.toString() });
    if (this.token.getToken()) {
      headersObj["Authorization"] = `${this.token.getToken()}`;
      // Add any params (can also chain .append() but I was conditionally adding params)
      let token = this.token.getToken();
      if (token) {
        if (token.indexOf("Bearer ") > -1) {
          token = token.split("Bearer ")[1];
        }
        newParams = newParams.append("token", token);
      }
    }
    // add a custom header
    req = req.clone({
      setHeaders: headersObj,
      params: newParams,
      reportProgress: true
    });

    // // pass on the modified request object
    return next.handle(req);
  }

}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
