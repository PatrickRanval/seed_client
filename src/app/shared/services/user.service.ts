import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

// I HAVE NO ****ING CLUE WHY THIS WORKS:
const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(private authService: AuthService) {}

  setUserFromDecodedToken(token: any): void {
    if (token) {
      let decodedToken = jwtHelper.decodeToken(token)
      const user = new User(
        decodedToken.user_id,
        decodedToken.first_name,
        decodedToken.last_name,
        decodedToken.email
      );
      console.log(`From user.service.ts User assigned as ${user}`)
      this.currentUserSubject.next(user);
    } else {
      console.error('Error decoding user information from token.');
    }
  }

  getUserId(): number | null {
    const currentUser = this.currentUserSubject.value;

    if (currentUser) {
      return currentUser.userId;
    } else {
      console.warn('User is null. Unable to get userId.');
      return null;
    }
  }
}