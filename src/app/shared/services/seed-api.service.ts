import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserService } from './user.service';
import { Tray } from '../models/tray.model';
import { Seed } from '../models/seed.model';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SeedApiService {

  constructor(private http:HttpClient, private userService:UserService) {}

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
    let id = this.userService.getUserId();
    const res = this.http.get<any>(`${environment.apiUrl}/users/${id}/user_varieties`)
      .pipe(
        catchError(this.handleError)
      );
    console.log(`Response Data:`, res);
    return res;
  }

  sendSeed(seedDataToRails:any): Observable<any> {
    //ALWAYS SUBSCRIBE TO THE OBSERVABLE
    //ALWAYS SUBSCRIBE TO THE OBSERVABLE
    //ALWAYS SUBSCRIBE TO THE OBSERVABLE
    //ALWAYS SUBSCRIBE TO THE OBSERVABLE
    //ALWAYS SUBSCRIBE TO THE OBSERVABLE
    let id = this.userService.getUserId();
    console.log(`payload to send`, seedDataToRails);
    let res = this.http.post<any>(`${environment.apiUrl}/users/${id}/user_varieties`, seedDataToRails)
    .pipe(
      catchError(this.handleError)
    );
    return res
  }

  removeSeed(seedUid:number){
    //INCONSISTENT BEHAVIOR HERE
    //INCONSISTENT BEHAVIOR HERE
    //INCONSISTENT BEHAVIOR HERE

    let id = this.userService.getUserId();
    let res = this.http.delete<any>(`${environment.apiUrl}/users/${id}/user_varieties/${seedUid}`)
    .pipe(
      catchError(this.handleError)
    );
    return res
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
    let id = this.userService.getUserId();
    let res = this.http.get<any>(`${environment.apiUrl}/users/${id}/user_trays`)
    .pipe(
      catchError(this.handleError)
    );
  console.log(`Response Data:`, res);
  return res;
  }

  createOrUpdateUserTray(userTrayDataToRails:any, trayId:number | null): Observable<any> {

    let id = this.userService.getUserId();
    if(!trayId) {

    let res = this.http.post<any>(`${environment.apiUrl}/users/${id}/user_trays`, userTrayDataToRails)
    .pipe(
      catchError(this.handleError)
    );
    return res
    } else {
      let res = this.http.put<any>(`${environment.apiUrl}/users/${id}/user_trays/${trayId}`, userTrayDataToRails)
      .pipe(
        catchError(this.handleError)
      );
      return res
    }
  }

  removeUserTray(tray:Tray) {
    let id = this.userService.getUserId();

    let res = this.http.delete<any>(`${environment.apiUrl}/users/${id}/user_trays/${tray.uid}`)
    .pipe(
      catchError(this.handleError)
    );
    return res
  }


  private handleError(error: any) {

    console.error('FAIL, client side', error);

    // Rethrow the error or return a custom error message
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}

