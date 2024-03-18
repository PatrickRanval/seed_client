import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class SeedApiService {

  constructor(private http:HttpClient, private userService:UserService) { }

  //I thought this was funny at the time, but it's the dumbest named method.
  getSignedUp(signupDataForRails:any) {
    let res = this.http.post(`${environment.apiUrl}/users`, signupDataForRails)
    .pipe(
      catchError(this.handleError)
    );
    console.log(`Signup Response Data:`, res);
    return res;
  }

  getAuth(email: string, password: string) {
    let token = this.http.post<{ token: string }>(`${environment.apiUrl}/login`, {
      email,
      password,
    });
    return token;
  }

  getSeeds(): Observable<any> {
    let id = this.userService.getUserId()
    if (!id) {;
      return throwError(() => new Error('Missing id parameter'));
    }

    const res = this.http.get<any>(`${environment.apiUrl}/users/${id}/user_varieties`)
      .pipe(
        catchError(this.handleError)
      );
    console.log(`Response Data:`, res);
    return res;
  }

  getTrays(): Observable<any> {
    let res = this.http.get<any>(`${environment.apiUrl}/trays`)
    .pipe(
      catchError(this.handleError)
    );
  console.log(`Response Data:`, res);
  return res;
  }


  getUserTrays(){
    console.log("Build getUserTrays()")
      //This method is index host/:user/user_trays for currentUser
  }

  postUserTrays(){
    console.log("Build saveUserTrays()")
      //This method is post host/:user/user_trays for currentUser
      //Question around whether this should rewrite everything every time or just target specific user_tray each time
  }


  private handleError(error: any) {

    console.error('FAIL, client side', error);

    // Rethrow the error or return a custom error message
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}

