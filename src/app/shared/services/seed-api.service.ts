import { Injectable } from '@angular/core';
import { of, Observable, catchError, throwError, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class SeedApiService {

  constructor(private http:HttpClient, private route:ActivatedRoute, private userService:UserService) { }


  getAuth(email: string, password: string) {
    let token = this.http.post<{ token: string }>(`${environment.apiUrl}/login`, {
      email,
      password,
    });
    return token;
  }

  getSeeds(): Observable<any> {
    let id = this.userService.getUserId();
    if (!id) {
      console.error('Missing id parameter');
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

  private handleError(error: any) {

    console.error('FAIL, client side', error);

    // Rethrow the error or return a custom error message
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}

  // getSeeds(id: number): Observable<any> {
  //   // DUMMY METHOD STAND-IN
  //   const dummyData = {
  //     id: 1,
  //     type: 'Tomato',
  //     name: 'Black Pineapple'
  //   };

  //   // Use of to create an observable that emits the dummy data
  //   return of(dummyData);
  // }

