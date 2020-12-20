import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    sessionStorage.clear();
  }

  saveToken(token: string): void {
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  saveUser(user: string): void {
    sessionStorage.setItem(USER_KEY, user);
  }

  getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  getUser() {
    return sessionStorage.getItem(USER_KEY);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(USER_KEY)
    return !(user === null)
  }
}
