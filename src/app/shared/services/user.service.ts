import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { User } from '../models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class UserService {

  public userId:number | null = null;

  public currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor() {}

  setUserFromDecodedToken(token: any): Observable<void> {
    if (token) {
      let decodedToken = jwtHelper.decodeToken(token);
      const user = new User(
        decodedToken.user_id,
        decodedToken.first_name,
        decodedToken.last_name,
        decodedToken.email
      );
      console.log(`From user.service.ts User assigned as ${user.userId}`);
      this.userId = user.userId;
      this.currentUserSubject.next(user);

      // Return an Observable to allow chaining and handling completion in the calling code
      return from(Promise.resolve());
    } else {
      console.error('Error decoding user information from token.');
      return from(Promise.reject('Error decoding user information from token.'));
    }
  }

  getUserId(){
    return this.userId;
  }

  logout(){
    this.userId = null;
    this.currentUserSubject.next(null);
  }
}