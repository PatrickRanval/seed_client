import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { SeedApiService } from './seed-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private seedAPI: SeedApiService, private router: Router) { }

  signup(email: string, firstName: string, lastName: string, password: string, passwordConfirm: string): Observable<any> {
    const signupDataForRails = {
      email: email,
      first_name: firstName,
      last_name: lastName,
      password: password,
      password_confirm: passwordConfirm
    }
    return this.seedAPI.getSignedUp(signupDataForRails);
  }

  login(email: string, password: string): Observable<any> {
    return this.seedAPI.getAuth(email, password);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  isAuthenticated() {
    const token = this.getToken();
    // Check if token exists and is not expired
    return !!token && !this.isTokenExpired(token);
  }

  private isTokenExpired(token: string): boolean {
    // Parse token to extract expiration date
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    // Get expiration timestamp (in seconds)
    const expirationTime = decodedToken.exp;
    // Check if token is expired
    return Date.now() >= expirationTime * 1000;
  }

  logout() {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
    this.router.navigate(['/login']);
  }
}